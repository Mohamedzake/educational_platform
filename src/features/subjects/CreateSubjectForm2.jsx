import styled from "styled-components";
import { useParams } from "react-router-dom";
import Input from "../../ui/Input";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm, useFormState } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";
import { createSubject, editSubject } from "../../services/apiSubjects";
import { createSubject2, editSubject2 } from "../../services/apiSubjects2";

function CreateSubjectForm({ cabinToEdit = {}, onCloseModal }) {
  const { subjectId } = useParams();
  const { _id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  //create

  const { isLoading: isCreating, mutate: createSubjects } = useMutation({
    mutationFn: createSubject2,
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
    mutationFn: ({ newDataa, _id }) => editSubject2(newDataa, _id),
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
    // const file = typeof data.file === "string" ? data.file : data.file[0];
    if (isEditSession)
      editSubjects(
        {
          newDataa: { ...data },
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
      createSubjects(
        { ...data, course: subjectId },
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
      <FormRow label="type" error={errors?.type?.message}>
        <Input
          type="text"
          id="type"
          disabled={isWorking}
          {...register("type")}
        />
      </FormRow>
      {/* <FormRow label="file" error={errors?.file?.message}>
        <FileInput
          type="file"
          id="file"
          {...register("file", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow> */}

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
