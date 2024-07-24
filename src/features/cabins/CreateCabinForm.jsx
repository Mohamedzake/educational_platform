import styled from "styled-components";

import Input from "../../ui/Input";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm, useFormState } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabins, editCabins } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { _id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  //create

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createCabins,
    onSuccess: () => {
      toast.success("Subject successFully created");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  //edit
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newDataa, _id }) => editCabins(newDataa, _id),
    onSuccess: () => {
      toast.success("Subject successFully edited");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  const isWorking = isCreating || isEditing;
  function onSubmit(data) {
    console.log(data.image[0]);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        {
          newDataa: { ...data, image: image },
          _id: editId,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }
  const yearOptions = [
    { value: "first", label: "1nd Year" },
    { value: "second", label: "2nd Year" },
    { value: "third", label: "3rd Year" },
    { value: "forth", label: "4rd Year" },
  ];
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="course name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Instructor Name" error={errors?.instructor?.message}>
        <Input
          type="text"
          id="instructor"
          disabled={isWorking}
          {...register("instructor", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="year" error={errors?.year?.message}>
        <select id="year" disabled={isWorking} {...register("year")}>
          <option value="">Select Year</option>
          {yearOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="course photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit course" : "Create new course"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
