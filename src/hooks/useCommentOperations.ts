import { useCallback } from "react";
import { useKanban } from "./useKanban";

export function useCommentOperations() {
  const { addComment, deleteComment, editComment } = useKanban();

  const handleAddComment = useCallback(
    (taskId: string, comment: string) => {
      const trimmedComment = comment.trim();
      if (trimmedComment) {
        addComment(taskId, trimmedComment);
      }
    },
    [addComment]
  );

  const handleDeleteComment = useCallback(
    (taskId: string, commentId: string) => {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        deleteComment(taskId, commentId);
      }
    },
    [deleteComment]
  );

  return {
    addComment: handleAddComment,
    deleteComment: handleDeleteComment,
    editComment,
  };
}
