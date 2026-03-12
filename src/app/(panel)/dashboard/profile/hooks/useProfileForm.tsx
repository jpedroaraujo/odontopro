"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const profileSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.string(),
  timezone: z.string(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm() {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      timezone: "",
      status: "Ativo",
    },
  });

  function onSubmit(data: ProfileFormData) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-secondary p-4 text-secondary-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return { form, onSubmit };
}
