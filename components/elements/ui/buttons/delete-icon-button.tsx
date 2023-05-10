import { FC } from 'react';
import IconButton from '@/components/layouts/icon-button';

type DeleteIconButtonProps = {
  className?: string;
  width?: string;
  height?: string;
  onDelete: () => void;
}

const DeleteIconButton: FC<DeleteIconButtonProps> = ({
                                                       className,
                                                       width = '1.375rem',
                                                       height = '1.375rem',
                                                       onDelete,
                                                     }) => {

  return (
    <IconButton
      className={className}
      name="delete"
      id="al"
      aria-label="Delete"
      width={width}
      height={height}
      danger
      onClick={onDelete}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" width={width} height={height}>
        <path d="m247 861-51-52 233-233-233-234 51-52 234 234 232-234 51 52-232 234 232 233-51 52-232-234-234 234Z" />
      </svg>
    </IconButton>
  );
};

export default DeleteIconButton;
