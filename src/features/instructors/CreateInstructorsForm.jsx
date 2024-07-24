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
import { createUsers, editUsers } from "../../services/apiUsers";
import { useState } from "react";
import toast from "react-hot-toast";

function CreateInstructorsForm({ cabinToEdit = {}, onCloseModal }) {
  const [selectedYear, setSelectedYear] = useState("");
  const { password, _id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  //create

  const { isLoading: isCreating, mutate: createUser } = useMutation({
    mutationFn: createUsers,
    onSuccess: () => {
      toast.success("User successFully created");

      queryClient.invalidateQueries({
        queryKey: ["instructor"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  // edit
  const { isLoading: isEditing, mutate: editUser } = useMutation({
    mutationFn: ({ newData2, _id }) => editUsers(newData2, _id),
    onSuccess: () => {
      toast.success("User successFully edited");

      queryClient.invalidateQueries({
        queryKey: ["instructor"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  const isWorking = isCreating || isEditing;
  function onSubmit(data) {
    console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editUser(
        { newData2: { ...data, image: image }, _id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createUser(
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
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Instructor name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
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
      <FormRow label="role" error={errors?.role?.message}>
        <Input
          type="text"
          id="role"
          disabled={isWorking}
          defaultValue="instructor"
          {...register("role", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="password" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isWorking}
          {...register("password")}
        />
      </FormRow>
      {/* <FormRow label="year" error={errors?.year?.message}>
        <select
          id="year"
          disabled={isWorking}
          {...register("year")}
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">Select Year</option>
          {yearOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormRow> */}
      <FormRow label="Instructor photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>
          {isEditSession ? "Edit Instructor" : "Create new Instructor"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateInstructorsForm;
