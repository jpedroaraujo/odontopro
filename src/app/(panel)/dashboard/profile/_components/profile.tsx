"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useProfileForm } from "../hooks/useProfileForm";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import Image from "next/image";
import imgTest from "@/../public/foto1.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";

export default function ProfileContent() {
  const { form, onSubmit } = useProfileForm();

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
              <Dialog>
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="font-bold">Configurar horários:</FieldLabel>

                      <DialogTrigger asChild>
                        <Button
                          className="w-full justify-between font-regular cursor-pointer"
                          variant="outline"
                        >
                          Clique aqui para selecionar horários <ChevronRight className="w-5 h-5" />
                        </Button>
                      </DialogTrigger>
                    </Field>
                  )}
                />

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Horários da clínica</DialogTitle>
                    <DialogDescription>
                      Selecione os horários que sua clínica está aberta atendendo.
                    </DialogDescription>
                  </DialogHeader>

                  <section className="py-4">
                    <p className="text-sm text-muted-foreground">
                      Clique nos horários abaixo para marcar ou desmarcar
                    </p>

                    <div>...</div>
                  </section>
                </DialogContent>
              </Dialog>

              <Controller
                name="timezone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="font-bold">Fuso horário:</FieldLabel>
                    <InputGroup>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue="active"
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione seu fuso horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="inactive">Inativo</SelectItem>
                          <SelectItem value="pending">Pendente</SelectItem>
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
