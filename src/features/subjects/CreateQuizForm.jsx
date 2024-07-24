import styled from "styled-components";
import { useParams } from "react-router-dom";
import Input from "../../ui/Input";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm, useFormState } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";
import { createSubject, editSubject } from "../../services/apiSubjects";
import { createSubject2, editSubject2 } from "../../services/apiSubjects2";
import { useState } from "react";
import { apiQuizDate, createQuiz, editQuiz } from "../../services/apiQuiz";

function CreateQuizForm({ cabinToEdit = {}, onCloseModal }) {
  const { subjectId } = useParams();
  console.log(subjectId);
  const { _id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  //create

  const { isLoading: isCreating, mutate: createSubjects } = useMutation({
    mutationFn: (data) => createQuiz(data, subjectId),
    onSuccess: () => {
      toast.success("Subject successFully created");

      queryClient.invalidateQueries({
        queryKey: ["quiz"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  //edit
  const { isLoading: isEditing, mutate: editSubjects } = useMutation({
    mutationFn: ({ newDataa, _id }) => editQuiz(newDataa, _id),
    onSuccess: () => {
      toast.success("Subject successFully edited");

      queryClient.invalidateQueries({
        queryKey: ["quiz"],
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
  const [selectedYear, setSelectedYear] = useState("");
  const correctOption = [
    { value: "0", label: "Options1" },
    { value: "1", label: "Options2" },
    { value: "2", label: "Options3" },
    { value: "3", label: "Options4" },
  ];
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const { data: date12 } = useQuery({
    queryKey: ["quizDate"],
    queryFn: () => apiQuizDate(subjectId),
  });
  console.log(date12?.[0]?.target);
  const target = date12?.[0]?.target;
  console.log(target);
  // const quizz = "quiz1";
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="question" error={errors?.question?.message}>
        <Input
          type="text"
          id="question"
          disabled={isWorking}
          {...register("question", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Options1" error={errors?.options?.[0]?.message}>
        <Input
          type="text"
          id="options"
          disabled={isWorking}
          {...register("options[0]", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Options2" error={errors?.options?.[1]?.message}>
        <Input
          type="text"
          id="options"
          disabled={isWorking}
          {...register("options[1]", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="options3" error={errors?.options?.[2]?.message}>
        <Input
          type="text"
          id="options"
          disabled={isWorking}
          {...register("options[2]")}
        />
      </FormRow>
      <FormRow label="Options4" error={errors?.options?.[3]?.message}>
        <Input
          type="text"
          id="options"
          disabled={isWorking}
          {...register("options[3]")}
        />
      </FormRow>
      <FormRow label="correctOption" error={errors?.correctOption?.message}>
        <select
          id="correctOption"
          disabled={isWorking}
          {...register("correctOption", { required: "This field is required" })}
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">Select correctOption</option>
          {correctOption.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormRow>
      <FormRow label="points" error={errors?.points?.message}>
        <Input
          type="text"
          id="points"
          disabled={isWorking}
          {...register("points", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="target" error={errors?.target?.message}>
        <Input
          type="text"
          id="target"
          disabled={isWorking}
          defaultValue={target}
          {...register("target", { required: "End time is required" })}
        />
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
          {isEditSession ? "Edit Question" : "Create New Question"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateQuizForm;
