import Input from "../../ui/Input";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";

import { useForm, useFormState } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabins, editCabins } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";
import { createUsers, editUsers } from "../../services/apiUsers";
import { useState } from "react";
import toast from "react-hot-toast";
import { editCurrentUser } from "../../services/apiAuth";
//k
function CreateCabinForm1({ cabinToEdit = {}, onCloseModal }) {
  const [selectedYear, setSelectedYear] = useState("");
  const { _id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  console.log(isEditSession);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();

  // edit
  const { isLoading: isEditing, mutate: editUser } = useMutation({
    mutationFn: ({ newData2 }) => editCurrentUser(newData2),
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
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editUser(
        { newData2: { ...data, image: image } },
        {
          onSuccess: (data) => {
            // reset();
            // onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        type={onCloseModal ? "modal" : "regular"}
      >
        <FormRow label="name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isWorking}
            {...register("name")}
          />
        </FormRow>
        <FormRow label="email" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            disabled={isWorking}
            {...register("email")}
          />
        </FormRow>

        <FormRow label="Profile photo" error={errors?.image?.message}>
          <FileInput id="image" accept="image/*" {...register("image")} />
        </FormRow>
        <FormRow>
          <Button variation="secondary" type="reset" onClick={reset}>
            Cancel
          </Button>
          <Button>{isEditSession ? "Edit User" : "Create new User"}</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCabinForm1;
