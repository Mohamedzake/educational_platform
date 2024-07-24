import { useParams } from "react-router-dom";
import Input from "../../ui/Input";

import Form from "../../ui/Form";
import Button from "../../ui/Button";

import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";

import {
  apiQuiz,
  createQuiz,
  createQuizDate,
  editQuiz,
  editQuizDate,
} from "../../services/apiQuiz";
import { useState } from "react";

function QuizDateForm({ cabinToEdit = {}, onCloseModal }) {
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
    mutationFn: (data) => createQuizDate(data, subjectId),
    onSuccess: () => {
      toast.success("Subject successFully created");

      queryClient.invalidateQueries({
        queryKey: ["quizDate"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  //edit
  const { isLoading: isEditing, mutate: editSubjects } = useMutation({
    mutationFn: ({ newDataa, _id }) => editQuizDate(newDataa, _id),
    onSuccess: () => {
      toast.success("Subject successFully edited");

      queryClient.invalidateQueries({
        queryKey: ["quizDate"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  const isWorking = isCreating || isEditing;
  // const [data0, setData0] = useState([]);
  // const { data: date4 } = useQuery({
  //   queryKey: ["quiz"],
  //   queryFn: () => apiQuiz(subjectId, data0),
  // });
  // console.log(date4);
  function onSubmit(data) {
    console.log(data);

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
            // setData0({ ...data });
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
      <FormRow label="Date" error={errors?.date?.message}>
        <Input
          type="date"
          id="date"
          disabled={isWorking}
          {...register("date", { required: "Date is required" })}
        />
      </FormRow>
      <FormRow label="Start Time" error={errors?.startTime?.message}>
        <Input
          type="time"
          id="startTime"
          disabled={isWorking}
          {...register("startTime", { required: "Start time is required" })}
        />
      </FormRow>
      <FormRow label="End Time" error={errors?.endTime?.message}>
        <Input
          type="time"
          id="endTime"
          disabled={isWorking}
          {...register("endTime", { required: "End time is required" })}
        />
      </FormRow>
      <FormRow label="Time per qu(S)" error={errors?.time?.message}>
        <Input
          type="text"
          id="time"
          disabled={isWorking}
          {...register("time", { required: "End time is required" })}
        />
      </FormRow>
      <FormRow label="name" error={errors?.target?.message}>
        <Input
          type="text"
          id="target"
          disabled={isWorking}
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
        <Button>{isEditSession ? "Edit Date" : "Create new Date"}</Button>
      </FormRow>
    </Form>
  );
}

export default QuizDateForm;
