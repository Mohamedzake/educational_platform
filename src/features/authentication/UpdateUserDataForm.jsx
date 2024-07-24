import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useUser } from "./useUser";

import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";

function UpdateUserDataForm({ cabinToEdit = {} }) {
  const { _id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  // We don't need the loading state// user?.data?.user: { email, name: currentFullName },
  const { user } = useUser();
  const { email, name: currentFullName } = user;
  console.log(user);
  const [name, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  // const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newData2 }) => editCurrentUser(newData2),
    onSuccess: () => {
      toast.success("User successFully edited");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    updateUser(
      { name, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          // Resetting form using .reset() that's available on all HTML form elements, otherwise the old filename will stay displayed in the UI
          e.target.reset();
        },
      }
    );
  }

  function handleCancel(e) {
    // We don't even need preventDefault because this button was designed to reset the form (remember, it has the HTML attribute 'reset')
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={name}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
          id="name"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          disabled={isUpdating}
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          // We should also validate that it's actually an image, but never mind
        />
      </FormRow>
      <FormRow>
        <Button onClick={handleCancel} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
