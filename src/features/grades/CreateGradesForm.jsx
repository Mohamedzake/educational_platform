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
import { createQuizGr, editQuizGrade } from "../../services/apiQuiz";
import { useParams } from "react-router-dom";

function CreateGradesForm({ cabinToEdit = {}, onCloseModal }) {
  const { subjectId } = useParams();
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
    mutationFn: createQuizGr,
    onSuccess: () => {
      toast.success("User successFully created");

      queryClient.invalidateQueries({
        queryKey: ["quizGradeS"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  // edit
  const { isLoading: isEditing, mutate: editUser } = useMutation({
    mutationFn: ({ newData2, _id }) => editQuizGrade(newData2, _id),
    onSuccess: () => {
      toast.success("User successFully edited");

      queryClient.invalidateQueries({
        queryKey: ["quizGradeS"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  const isWorking = isCreating || isEditing;
  function onSubmit(data) {
    console.log(data);
    // const image = typeof data.image === "string" ? data.image : data.image[0];
    const target = "subject";
    if (isEditSession)
      editUser(
        { newData2: { ...data }, _id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createUser(
        { ...data, target, course: subjectId },
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
      {isEditSession ? (
        <FormRow label="student mark" error={errors?.mark?.message}>
          <Input
            type="number"
            id="mark"
            disabled={isWorking}
            {...register("mark", { required: "This field is required" })}
          />
        </FormRow>
      ) : (
        <>
          <FormRow label="student number" error={errors?.number?.message}>
            <Input
              type="number"
              id="number"
              disabled={isWorking}
              {...register("number", { required: "This field is required" })}
            />
          </FormRow>{" "}
          <FormRow label="student mark" error={errors?.mark?.message}>
            <Input
              type="number"
              id="mark"
              disabled={isWorking}
              {...register("mark", { required: "This field is required" })}
            />
          </FormRow>
        </>
      )}
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>
          {isEditSession ? "Edit UserGrade" : "Create new UserGrade"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGradesForm;
