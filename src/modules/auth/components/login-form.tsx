"use client";

import { useForm } from "@tanstack/react-form";
import { AtSign, Lock } from "reicon-react";
import { errorMessage } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { Toaster, toast } from "@/shared/components/ui/toast";
import { login } from "../actions";
import { authErrorCopy, authLogin } from "../copy";
import { loginSchema } from "../schema";

export function LoginForm() {
  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: loginSchema },
    onSubmit: async ({ value }) => {
      const result = await login(value);

      if (!result.ok) {
        const feedback =
          authErrorCopy[
            result.error === "invalid_input" ? "server_error" : result.error
          ];

        toast.add({
          type: "error",
          title: feedback.title,
          description: feedback.description,
        });
      } 

      form.reset({
        email: "",
        password: ""
      });
    },
  });

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
      className="space-y-5"
    >
      <form.Field name="email">
        {(field) => {
          const message = errorMessage(field.state.meta.errors);
          const invalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <div className="flex flex-col gap-2">
              <label
                htmlFor={field.name}
                className="text-sm font-semibold text-foreground"
              >
                {authLogin.form.email.label}
              </label>
              <InputGroup
                className="h-11 rounded-xl bg-muted/60"
                data-invalid={invalid}
              >
                <InputGroupAddon align="inline-start">
                  <AtSign size={16} />
                </InputGroupAddon>
                <InputGroupInput
                  id={field.name}
                  name={field.name}
                  type="email"
                  aria-invalid={invalid}
                  aria-describedby={invalid ? `${field.name}-error` : undefined}
                  autoComplete="email"
                  placeholder={authLogin.form.email.placeholder}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </InputGroup>
              {invalid && message ? (
                <p
                  id={`${field.name}-error`}
                  className="text-xs text-destructive"
                >
                  {message}
                </p>
              ) : null}
            </div>
          );
        }}
      </form.Field>

      <form.Field name="password">
        {(field) => {
          const message = errorMessage(field.state.meta.errors);
          const invalid =
            field.state.meta.isTouched && !field.state.meta.isValid;

          return (
            <div className="flex flex-col gap-2">
              <label
                htmlFor={field.name}
                className="text-sm font-semibold text-foreground"
              >
                {authLogin.form.password.label}
              </label>
              <InputGroup
                className="h-11 rounded-xl bg-muted/60"
                data-invalid={invalid}
              >
                <InputGroupAddon align="inline-start">
                  <Lock size={16} />
                </InputGroupAddon>
                <InputGroupInput
                  id={field.name}
                  name={field.name}
                  type="password"
                  aria-invalid={invalid}
                  aria-describedby={invalid ? `${field.name}-error` : undefined}
                  autoComplete="current-password"
                  placeholder={authLogin.form.password.placeholder}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </InputGroup>
              {invalid && message ? (
                <p
                  id={`${field.name}-error`}
                  className="text-xs text-destructive"
                >
                  {message}
                </p>
              ) : null}
            </div>
          );
        }}
      </form.Field>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <Button
            type="submit"
            size="lg"
            className="h-11 w-full text-sm font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? authLogin.form.submit.loadingLabel
              : authLogin.form.submit.label}
          </Button>
        )}
      </form.Subscribe>
      <Toaster />
    </form>
  );
}
