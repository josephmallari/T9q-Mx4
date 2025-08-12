import type { Comment as CommentType } from "../../types";
import Comment from "./Comment";

interface CommentsListProps {
  comments: CommentType[];
  taskId: string;
  onDeleteComment: (commentId: string) => void;
  onEditComment: (commentId: string, newText: string) => void;
}

export default function CommentsList({ comments, taskId, onDeleteComment, onEditComment }: CommentsListProps) {
  if (comments.length === 0) {
    return (
      <div className="comments-empty">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} taskId={taskId} onDelete={onDeleteComment} onEdit={onEditComment} />
      ))}
    </div>
  );
}
