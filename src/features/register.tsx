import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Input from "../components/input"
import { Button, Link } from "@nextui-org/react"
import { useRegisterMutation } from "../app/services/userApi"
import { hasErrorField } from "../utils/has-error-field"
import ErrorMessage from "../components/error-message"

type RegisterProps = {
  email: string
  password: string
  name: string
}

type Props = {
  setSelected: (value: string) => void
}

const Register = ({ setSelected }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<RegisterProps>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = useState("")
  //   const navigate = useNavigate()
  //   const [triggerCurrentQuery] = useLazyCurrentQuery()

  const onSubmit = async (data: RegisterProps) => {
    try {
      await register(data).unwrap()
      setSelected("login")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        control={control}
        name="name"
        label="Имя"
        type="text"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Обязательное поле"
      />
      <Input
        control={control}
        name="password"
        label="Пароль"
        type="password"
        required="Обязательное поле"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Уже есть аккаунт?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("login")}
        >
          Войдите
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}

export default Register
