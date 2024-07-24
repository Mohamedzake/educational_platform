import { useParams } from "react-router-dom";
import Input from "../../ui/Input";

import Form from "../../ui/Form";
import Button from "../../ui/Button";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import FormRow from "../../ui/FormRow";
import toast from "react-hot-toast";

import {
  createQuiz,
  createQuizDate,
  editQuiz,
  editQuizDate,
  editQuizGrade,
} from "../../services/apiQuiz";

function QuizGradesForm({ cabinToEdit = {}, onCloseModal }) {
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
        queryKey: ["quizGrades"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  //edit
  const { isLoading: isEditing, mutate: editSubjects } = useMutation({
    mutationFn: ({ newDataa, _id }) => editQuizGrade(newDataa, _id),
    onSuccess: () => {
      toast.success("Subject successFully edited");

      queryClient.invalidateQueries({
        queryKey: ["quizGrades"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    console.log(data);
    const target = "quiz";
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
      <FormRow label="name" error={errors?.user?.[0]?.message}>
        <Input
          type="text"
          id="user"
          disabled={isWorking}
          {...register("user[name]", { required: "Date is required" })}
        />
      </FormRow>
      <FormRow label="mark" error={errors?.name?.message}>
        <Input
          type="text"
          id="mark"
          disabled={isWorking}
          {...register("mark", { required: "Date is required" })}
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
        <Button>{isEditSession ? "Edit Subject" : "Create new Subject"}</Button>
      </FormRow>
    </Form>
  );
}

export default QuizGradesForm;
