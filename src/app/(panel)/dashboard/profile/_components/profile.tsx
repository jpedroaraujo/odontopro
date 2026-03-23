"use client";

import { useState } from "react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProfileFormData, useProfileForm } from "../hooks/useProfileForm";
import { Button } from "@/components/ui/button";
import { Controller, ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import Image from "next/image";
import imgTest from "@/../public/foto1.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";

export default function ProfileContent() {
  const { form, onSubmit } = useProfileForm();

  const timezones = Intl.supportedValuesOf("timeZone").filter(
    (zone) =>
      (zone.startsWith("America/Sao_Paulo") ||
        zone.startsWith("America/Fortaleza") ||
        zone.startsWith("America/Recife") ||
        zone.startsWith("America/Boa_Vista") ||
        zone.startsWith("America/Manaus") ||
        zone.startsWith("America/Cuiaba") ||
        zone.startsWith("America/Belem") ||
        zone.startsWith("America/Bahia")) &&
      !zone.toLowerCase().includes("bahia_banderas"),
  );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Meu perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden">
              <Image
                src={imgTest}
                alt="Imagem de perfil da clínica"
                className="object-cover"
                fill
              />
            </div>
          </div>

          <form
            id="profile-form"
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log("erros na validação:", errors);
            })}
          >
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-name" className="font-bold">
                      Nome completo:
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu nome completo"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-phone" className="font-bold">
                      Telefone:
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-phone"
                      placeholder="Digite seu telefone"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-address" className="font-bold">
                      Endereço completo:
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-address"
                      placeholder="Digite seu endereço completo"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="font-bold">Status:</FieldLabel>
                    <InputGroup>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value ? "active" : "inactive"}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione seu status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Ativo (clínica aberta)</SelectItem>
                          <SelectItem value="inactive">Inativo (clínica fechada)</SelectItem>
                        </SelectContent>
                      </Select>
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="times"
                control={form.control}
                render={({ field, fieldState }) => (
                  <ScheduleDialog field={field} fieldState={fieldState} />
                )}
              />

              <Controller
                name="timezone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="font-bold">Selecione o fuso horário:</FieldLabel>
                    <InputGroup>
                      <Select onValueChange={(value) => field.onChange(value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione seu fuso horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((zone) => (
                            <SelectItem key={zone} value={zone}>
                              {zone.replace("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            form="profile-form"
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-300"
          >
            Salvar alterações
          </Button>
        </CardFooter>
      </Card>

      <Button className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 mt-4">
        Sair da conta
      </Button>
    </>
  );
}

type ScheduleDialogProps = {
  field: ControllerRenderProps<ProfileFormData, "times">;
  fieldState: ControllerFieldState;
};

function ScheduleDialog({ field, fieldState }: ScheduleDialogProps) {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [tempTimes, setTempTimes] = useState<string[]>([]);

  function generateTimeSlots(): string[] {
    const slots = [];
    for (let i = 8; i <= 24; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, "0");
        const minute = (j * 30).toString().padStart(2, "0");

        slots.push(`${hour}:${minute}`);
      }
    }
    return slots;
  }

  return (
    <Dialog
      open={isScheduleDialogOpen}
      onOpenChange={(open) => {
        setIsScheduleDialogOpen(open);
        if (open) {
          setTempTimes(field?.value ?? []);
        }
      }}
    >
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel className="font-bold">Configurar horários:</FieldLabel>

        <DialogTrigger asChild>
          <Button className="w-full justify-between font-normal cursor-pointer" variant="outline">
            Clique aqui para selecionar horários <ChevronRight className="w-5 h-5" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Horários da clínica</DialogTitle>
            <DialogDescription>
              Selecione os horários que sua clínica está aberta atendendo.
            </DialogDescription>
          </DialogHeader>

          <section className="py-4">
            <p className="text-sm text-muted-foreground mb-2">
              Clique nos horários abaixo para marcar ou desmarcar
            </p>

            <div className="grid grid-cols-5 gap-3">
              {generateTimeSlots().map((slot) => (
                <FieldLabel
                  key={slot}
                  className="w-fit h-[35px] text-center cursor-pointer hover:bg-gray-100 border-0! transition-all duration-300"
                >
                  <Field
                    orientation="horizontal"
                    className={clsx("h-[35px] items-center text-center flex-row rounded-md", {
                      "border-2 border-teal-500": tempTimes.includes(slot),
                      "border border-slate-300": !tempTimes.includes(slot),
                    })}
                  >
                    <Checkbox
                      id={slot}
                      name={slot}
                      className="w-0 h-0 opacity-0 absolute"
                      checked={tempTimes.includes(slot)}
                      onCheckedChange={(checked: boolean) => {
                        setTempTimes((prev) =>
                          checked ? [...prev, slot] : prev.filter((value) => value !== slot),
                        );
                      }}
                    />
                    <FieldTitle className="flex items-center justify-center">{slot}</FieldTitle>
                  </Field>
                </FieldLabel>
              ))}
            </div>
          </section>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                className="bg-teal-500 hover:bg-teal-600 w-full cursor-pointer"
                onClick={() => field.onChange(tempTimes)}
              >
                Salvar horários
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Field>
    </Dialog>
  );
}
