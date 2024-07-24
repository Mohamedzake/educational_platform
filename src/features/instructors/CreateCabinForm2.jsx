import Input from "../../ui/Input";

import Form from "../../ui/Form";
import Button from "../../ui/Button";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FormRow from "../../ui/FormRow";

import toast from "react-hot-toast";
import { editCurrentUserp } from "../../services/apiAuth";
//k
function CreateCabinForm2({ cabinToEdit = {}, onCloseModal }) {
  const { password, _id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  console.log(isEditSession);
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();

  // edit
  const { isLoading: isEditing, mutate: editUser } = useMutation({
    mutationFn: ({ newData2 }) => editCurrentUserp(newData2),
    onSuccess: () => {
      toast.success("User successFully edited");

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      // reset();
    },
    onError: (err) => toast.error(err.message),
  });
  const isWorking = isEditing;
  function onSubmit(data) {
    console.log(data);

    editUser(
      { newData2: { ...data } },
      {
        onSuccess: (data) => {
          reset();
          // onCloseModal?.();
        },
      }
    );
  }
  // function onSubmit(password) {
  //   editUser({ ...password }, { onSuccess: () => reset() });
  //   console.log(password);
  // }
  function onError(errors) {
    console.log(errors);
  }

  function handleReset(e) {
    // e.preventDefault();
    reset();
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow
          label="currentPassword"
          error={errors?.currentPassword?.message}
        >
          <Input
            type="password"
            id="currentPassword"
            disabled={isWorking}
            {...register("currentPassword")}
          />
        </FormRow>
        <FormRow
          label="Password (min 6 characters)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            // this makes the form better for password managers
            autoComplete="current-password"
            disabled={isWorking}
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password needs a minimum of 6 characters",
              },
            })}
          />
        </FormRow>
        <FormRow
          label="Confirm password"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isWorking}
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
        </FormRow>
        <FormRow>
          <Button onClick={handleReset} type="reset" variation="secondary">
            Cancel
          </Button>
          <Button disabled={isWorking}>Update password</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCabinForm2;
