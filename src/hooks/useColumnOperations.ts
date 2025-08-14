import { useCallback } from "react";
import { useKanban } from "./useKanban";

export function useColumnOperations() {
  const { addColumn, deleteColumn, renameColumn } = useKanban();

  const handleAddColumn = useCallback(
    (title: string) => {
      const id = `col_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      addColumn(id, title);
    },
    [addColumn]
  );

  const handleDeleteColumn = useCallback(
    (columnId: string, columnTitle: string) => {
      if (
        window.confirm(
          `Are you sure you want to delete the column "${columnTitle}"? This will also delete all tasks in this column.`
        )
      ) {
        deleteColumn(columnId);
      }
    },
    [deleteColumn]
  );

  const handleRenameColumn = useCallback(
    (columnId: string, newTitle: string) => {
      const trimmedTitle = newTitle.trim();
      if (trimmedTitle) {
        renameColumn(columnId, trimmedTitle);
      }
    },
    [renameColumn]
  );

  return {
    addColumn: handleAddColumn,
    deleteColumn: handleDeleteColumn,
    renameColumn: handleRenameColumn,
  };
}
