"use client";
import { es } from "date-fns/locale";
import {
  CalendarDays,
  Clock,
  Mail,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Fragment, useEffect, useMemo, useState } from "react";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const STEPS = [
  { id: 1, label: "Fecha", icon: CalendarDays },
  { id: 2, label: "Horario", icon: Clock },
  { id: 3, label: "Datos", icon: Mail },
  { id: 4, label: "Pagar", icon: Check },
];

function isWeekday(date: Date) {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    fetch(
      "/api/get-booked-slots?date=" + selectedDate?.toISOString().slice(0, 10),
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.booked) {
          const bookedSet = new Set(data.booked);
          // Deshabilitar los horarios ya reservados
          TIME_SLOTS.forEach((time) => {
            const button = document.querySelector(
              `button[data-time="${time}"]`,
            ) as HTMLButtonElement | null;
            if (button) {
              button.disabled = bookedSet.has(time);
            }
          });
        }
      });
  }, []);

  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const maxDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 60);
    return d;
  }, []);

  function handleDateSelect(date: Date | undefined) {
    setSelectedDate(date);
    if (date) setStep(2);
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
    setStep(3);
  }

  function validateEmail(value: string) {
    if (!value) return "Ingresa tu email";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email no valido";
    return "";
  }

  function handleEmailContinue() {
    const error = validateEmail(email);
    setEmailError(error);
    if (!error) setStep(4);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setApiError("");

    try {
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          date: selectedDate?.toISOString(),
          time: selectedTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Error al crear el pago. Intenta de nuevo.");
        return;
      }

      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch {
      setApiError("Error de conexion. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : null;

  return (
    <div className="flex flex-col gap-8">
      {/* Stepper */}
      <nav
        aria-label="Progreso"
        className="flex items-center justify-center gap-2"
      >
        {STEPS.map((s, i) => {
          const isActive = step === s.id;
          const isDone = step > s.id;
          return (
            <Fragment key={s.id}>
              {i > 0 && (
                <div
                  className={cn(
                    "hidden h-px w-8 sm:block",
                    isDone ? "bg-accent" : "bg-border",
                  )}
                />
              )}
              <button
                type="button"
                disabled={!isDone}
                onClick={() => isDone && setStep(s.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive && "bg-accent text-accent-foreground",
                  isDone && "bg-accent/15 text-accent cursor-pointer",
                  !isActive && !isDone && "text-muted-foreground",
                )}
              >
                <s.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            </Fragment>
          );
        })}
      </nav>

      {/* Step 1: Date */}
      {step === 1 && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <h2 className="font-serif text-xl text-foreground">
              Selecciona una fecha
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Lunes a viernes, hasta 60 dias de anticipacion
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-2">
            <Calendar
              mode="single"
              locale={es}
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) =>
                date < tomorrow || date > maxDate || !isWeekday(date)
              }
              className="[--cell-size:--spacing(10)]"
            />
          </div>
        </div>
      )}

      {/* Step 2: Time */}
      {step === 2 && (
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="font-serif text-xl text-foreground">
              Selecciona un horario
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {formattedDate}
            </p>
          </div>
          <div className="grid w-full max-w-sm grid-cols-3 gap-3">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleTimeSelect(time)}
                className={cn(
                  "flex items-center justify-center rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-all hover:border-accent hover:text-accent",
                  selectedTime === time &&
                    "border-accent bg-accent/15 text-accent",
                )}
              >
                {time}
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            onClick={() => setStep(1)}
            className="text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Cambiar fecha
          </Button>
        </div>
      )}

      {/* Step 3: Email */}
      {step === 3 && (
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="font-serif text-xl text-foreground">
              Tu email de contacto
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Te enviaremos la confirmacion del turno
            </p>
          </div>
          <div className="w-full max-w-sm space-y-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleEmailContinue()}
              aria-invalid={!!emailError}
              className="h-11"
            />
            {emailError && (
              <p className="text-sm text-destructive">{emailError}</p>
            )}
            <Button
              onClick={handleEmailContinue}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
            >
              Continuar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={() => setStep(2)}
            className="text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Cambiar horario
          </Button>
        </div>
      )}

      {/* Step 4: Summary & Pay */}
      {step === 4 && (
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="font-serif text-xl text-foreground">
              Confirma tu turno
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Revisa los datos y procede al pago
            </p>
          </div>

          <div className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Fecha</p>
                <p className="font-medium capitalize text-foreground">
                  {formattedDate}
                </p>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Horario</p>
                <p className="font-medium text-foreground">{selectedTime} hs</p>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{email}</p>
              </div>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground">
                Consulta profesional
              </span>
              <span className="font-serif text-2xl text-foreground">
                $30.000
              </span>
            </div>
          </div>

          {apiError && (
            <p className="text-sm text-destructive text-center">{apiError}</p>
          )}

          <div className="flex w-full max-w-sm flex-col gap-3">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>Pagar con Mercado Pago</>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setStep(3)}
              className="text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
