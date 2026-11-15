import Link from "next/link";

export function AuthPage() {

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast.success("Form submitted successfully")
    },
  })

  return (
    <div className="relative w-full overflow-hidden px-4 md:h-screen">
      <div className="relative mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center border-x *:px-6">
        <div className="flex flex-col space-y-6">
          <Link aria-label="Home" className="" href="#">
            Image LOGO : icon.png
          </Link>
          <div className="space-y-1">
            <h1 className="font-heading font-semibold text-xl tracking-wide">
              Hey, welcome!
            </h1>
            <p className="text-base text-muted-foreground">
              Log in or sign up. It only takes a moment.
            </p>
          </div>
        </div>

        <div className="relative my-6 flex size-full flex-col gap-4 py-8">
          <FullWidthDivider position="top" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          aria-label="Email address"
                          placeholder="your.email@example.com"
                          type="email"
                        />
                        <InputGroupAddon align="inline-start">
                          <AtSignIcon />
                        </InputGroupAddon>
                      </InputGroup>

                      {/* Opsional */}
                      {/* <FieldDescription>
                        Provide a concise title for your bug report.
                      </FieldDescription> */}
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          aria-label="Email address"
                          placeholder="your.email@example.com"
                          type="email"
                        />
                        <InputGroupAddon align="inline-start">
                          <AtSignIcon />
                        </InputGroupAddon>
                      </InputGroup>

                      {/* Opsional */}
                      {/* <FieldDescription>
                        Provide a concise title for your bug report.
                      </FieldDescription> */}
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
            <Button className="w-full" size="sm" type="submit">
              Masuk
            </Button>
          </form>

          <FullWidthDivider position="bottom" />
        </div>

        <p className="text-center text-muted-foreground text-sm">
          This site is protected by reCAPTCHA and the Google{" "}
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="#"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            className="underline underline-offset-4 hover:text-primary"
            href="#"
          >
            Terms of Service
          </Link>{" "}
          apply.
        </p>
      </div>
    </div>
  );
}

// Contoh Code Zod
// import * as z from "zod"

// const formSchema = z.object({
//   title: z
//     .string()
//     .min(5, "Bug title must be at least 5 characters.")
//     .max(32, "Bug title must be at most 32 characters."),
//   description: z
//     .string()
//     .min(20, "Description must be at least 20 characters.")
//     .max(100, "Description must be at most 100 characters."),
// })

// Contoh 