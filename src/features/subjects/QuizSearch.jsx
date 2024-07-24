import { useParams } from "react-router-dom";
import Input from "../../ui/Input";

import Form from "../../ui/Form";
import Button from "../../ui/Button";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";

import {
  apiQuiz,
  createQuiz,
  createQuizDate,
  createQuizType,
  editQuiz,
  editQuizDate,
} from "../../services/apiQuiz";

function QuizSearch({ cabinToEdit = {}, onCloseModal }) {
  const { subjectId } = useParams();
  console.log(subjectId);
  const { _id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  // console.log(isEditSession);
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const queryClient = useQueryClient();
  //create

  const { isLoading: isCreating, mutate: createSubjects } = useMutation({
    mutationFn: (data) => createQuizType(data),
    onSuccess: () => {
      toast.success("Subject successFully created");

      queryClient.invalidateQueries({
        queryKey: ["quizType"],
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
        queryKey: ["quiz"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  const isWorking = isCreating || isEditing;

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
      {/* <FormRow label="Date" error={errors?.date?.message}>
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
      </FormRow> */}
      <FormRow label="name" error={errors?.type?.message}>
        <Input
          type="text"
          id="type"
          disabled={isWorking}
          {...register("type", { required: "this is required" })}
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
        <Button>{isEditSession ? "Edit nameQuiz" : "Create New Quiz"}</Button>
      </FormRow>
    </Form>
  );
}

export default QuizSearch;
