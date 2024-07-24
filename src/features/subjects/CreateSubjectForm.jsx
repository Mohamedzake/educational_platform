import styled from "styled-components";

import Input from "../../ui/Input";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm, useFormState } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";
import { createSubject, editSubject } from "../../services/apiSubjects";
import { editSubject2 } from "../../services/apiSubjects2";

function CreateSubjectForm({ cabinToEdit = {}, onCloseModal, type, index }) {
  const { subjectId } = useParams();
  const { _id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  console.log(isEditSession);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  //create

  const { isLoading: isCreating, mutate: createSubjects } = useMutation({
    mutationFn: createSubject,
    onSuccess: () => {
      toast.success("Subject successFully created");

      queryClient.invalidateQueries({
        queryKey: ["subject"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  //edit
  const { isLoading: isEditing, mutate: editSubjects } = useMutation({
    mutationFn: ({ newDataa, _id }) => editSubject(newDataa, _id),
    onSuccess: () => {
      toast.success("Subject successFully edited");

      queryClient.invalidateQueries({
        queryKey: ["subject"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    console.log(data);
    const file = typeof data.file === "string" ? data.file : data.file[0];
    if (isEditSession)
      editSubjects(
        {
          newDataa: { ...data, file: file },
          _id: data.materials[index].id,
        },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createSubjects(
        { ...data, file: file, type: type, course: subjectId },
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

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {type === "Meeting" ? (
        <FormRow label="link" error={errors?.type?.message}>
          <Input
            type="text"
            id="file"
            disabled={isWorking}
            {...register("file")}
          />
        </FormRow>
      ) : (
        <FormRow label="file" error={errors?.file?.message}>
          <FileInput
            type="file"
            id="file"
            {...register("file", {
              required: isEditSession ? false : "This field is required",
            })}
          />
        </FormRow>
      )}

      {/* <FormRow label="doctor Name" error={errors?.instructor?.message}>
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
    */}
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit Item" : "Create new Item"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateSubjectForm;
