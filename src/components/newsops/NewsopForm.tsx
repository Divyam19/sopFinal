import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/newsops/useOptimisticNewsops";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";


import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";


import { type Newsop, insertNewsopParams } from "@/lib/db/schema/newsops";
import {
  createNewsopAction,
  deleteNewsopAction,
  updateNewsopAction,
} from "@/lib/actions/newsops";


const NewsopForm = ({
  
  newsop,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  newsop?: Newsop | null;
  
  openModal?: (newsop?: Newsop) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Newsop>(insertNewsopParams);
  const editing = !!newsop?.id;
    const [date, setDate] = useState<Date | undefined>(
    newsop?.date,
  );

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("newsops");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Newsop },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Newsop ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const newsopParsed = await insertNewsopParams.safeParseAsync({  ...payload });
    if (!newsopParsed.success) {
      setErrors(newsopParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = newsopParsed.data;
    const pendingNewsop: Newsop = {
      updatedAt: newsop?.updatedAt ?? new Date(),
      createdAt: newsop?.createdAt ?? new Date(),
      id: newsop?.id ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingNewsop,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateNewsopAction({ ...values, id: newsop.id })
          : await createNewsopAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingNewsop 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
              <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.id ? "text-destructive" : "",
          )}
        >
          Id
        </Label>
        <Input
          type="text"
          name="id"
          className={cn(errors?.id ? "ring ring-destructive" : "")}
          defaultValue={newsop?.id ?? ""}
        />
        {errors?.id ? (
          <p className="text-xs text-destructive mt-2">{errors.id[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.oldsopid ? "text-destructive" : "",
          )}
        >
          Oldsopid
        </Label>
        <Input
          type="text"
          name="oldsopid"
          className={cn(errors?.oldsopid ? "ring ring-destructive" : "")}
          defaultValue={newsop?.oldsopid ?? ""}
        />
        {errors?.oldsopid ? (
          <p className="text-xs text-destructive mt-2">{errors.oldsopid[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.uploaderid ? "text-destructive" : "",
          )}
        >
          Uploaderid
        </Label>
        <Input
          type="text"
          name="uploaderid"
          className={cn(errors?.uploaderid ? "ring ring-destructive" : "")}
          defaultValue={newsop?.uploaderid ?? ""}
        />
        {errors?.uploaderid ? (
          <p className="text-xs text-destructive mt-2">{errors.uploaderid[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.parameter ? "text-destructive" : "",
          )}
        >
          Parameter
        </Label>
        <Input
          type="text"
          name="parameter"
          className={cn(errors?.parameter ? "ring ring-destructive" : "")}
          defaultValue={newsop?.parameter ?? ""}
        />
        {errors?.parameter ? (
          <p className="text-xs text-destructive mt-2">{errors.parameter[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.uploadername ? "text-destructive" : "",
          )}
        >
          Uploadername
        </Label>
        <Input
          type="text"
          name="uploadername"
          className={cn(errors?.uploadername ? "ring ring-destructive" : "")}
          defaultValue={newsop?.uploadername ?? ""}
        />
        {errors?.uploadername ? (
          <p className="text-xs text-destructive mt-2">{errors.uploadername[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.score ? "text-destructive" : "",
          )}
        >
          Score
        </Label>
        <Input
          type="text"
          name="score"
          className={cn(errors?.score ? "ring ring-destructive" : "")}
          defaultValue={newsop?.score ?? ""}
        />
        {errors?.score ? (
          <p className="text-xs text-destructive mt-2">{errors.score[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.procedure ? "text-destructive" : "",
          )}
        >
          Procedure
        </Label>
        <Input
          type="text"
          name="procedure"
          className={cn(errors?.procedure ? "ring ring-destructive" : "")}
          defaultValue={newsop?.procedure ?? ""}
        />
        {errors?.procedure ? (
          <p className="text-xs text-destructive mt-2">{errors.procedure[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.title ? "text-destructive" : "",
          )}
        >
          Title
        </Label>
        <Input
          type="text"
          name="title"
          className={cn(errors?.title ? "ring ring-destructive" : "")}
          defaultValue={newsop?.title ?? ""}
        />
        {errors?.title ? (
          <p className="text-xs text-destructive mt-2">{errors.title[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
<div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.date ? "text-destructive" : "",
          )}
        >
          Date
        </Label>
        <br />
        <Popover>
          <Input
            name="date"
            onChange={() => {}}
            readOnly
            value={date?.toUTCString() ?? new Date().toUTCString()}
            className="hidden"
          />

          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !newsop?.date && "text-muted-foreground",
              )}
            >
              {date ? (
                <span>{format(date, "PPP")}</span>
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              onSelect={(e) => setDate(e)}
              selected={date}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors?.date ? (
          <p className="text-xs text-destructive mt-2">{errors.date[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.flag ? "text-destructive" : "",
          )}
        >
          Flag
        </Label>
        <Input
          type="text"
          name="flag"
          className={cn(errors?.flag ? "ring ring-destructive" : "")}
          defaultValue={newsop?.flag ?? ""}
        />
        {errors?.flag ? (
          <p className="text-xs text-destructive mt-2">{errors.flag[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.accuracy ? "text-destructive" : "",
          )}
        >
          Accuracy
        </Label>
        <Input
          type="text"
          name="accuracy"
          className={cn(errors?.accuracy ? "ring ring-destructive" : "")}
          defaultValue={newsop?.accuracy ?? ""}
        />
        {errors?.accuracy ? (
          <p className="text-xs text-destructive mt-2">{errors.accuracy[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.completeness ? "text-destructive" : "",
          )}
        >
          Completeness
        </Label>
        <Input
          type="text"
          name="completeness"
          className={cn(errors?.completeness ? "ring ring-destructive" : "")}
          defaultValue={newsop?.completeness ?? ""}
        />
        {errors?.completeness ? (
          <p className="text-xs text-destructive mt-2">{errors.completeness[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.relevance ? "text-destructive" : "",
          )}
        >
          Relevance
        </Label>
        <Input
          type="text"
          name="relevance"
          className={cn(errors?.relevance ? "ring ring-destructive" : "")}
          defaultValue={newsop?.relevance ?? ""}
        />
        {errors?.relevance ? (
          <p className="text-xs text-destructive mt-2">{errors.relevance[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: newsop });
              const error = await deleteNewsopAction(newsop.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: newsop,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default NewsopForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
