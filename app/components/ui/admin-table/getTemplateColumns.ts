import { IAdminTableColumn } from '@/components/ui/admin-table/admin-table.types';

export function getTemplateColumns(columns: IAdminTableColumn[]): string {
  return columns
    .map((column) => {
      return column.width ? `${column.width}px` : '1fr';
    })
    .join(' ')
    .trim();
}
