import React from 'react'

// import DeleteIcon from '../Icons/DeleteIcon';
// import EditIcon from '../Icons/EditIcon';
// import HideIcon from '../Icons/HideIcon';
// import InfoIcon from '../Icons/InfoIcon';
// import LockIcon from '../Icons/LockIcon';

// import { Container } from './styles';
interface IActions {
  onLock?: () => void
  onView?: (id: number) => void
  onDelete?: (id: number) => void
  onEdit?: (id: number) => void
  onHide?: () => void
  id?: number
}
const TableActions: React.FC<IActions> = ({
  onLock,
  onView,
  onDelete,
  onEdit,
  onHide,
  id
}) => {
  if (!id) return null
  return (
    <div className="w-full center row gap-4">
      {/* {!!onView && (
				<button onClick={() => onView(id)}>
					<InfoIcon />
				</button>
			)}
			{!!onLock && (
				<button>
					<LockIcon />
				</button>
			)}
			{!!onEdit && (
				<button onClick={() => onEdit(id)}>
					<EditIcon />
				</button>
			)}
			{!!onDelete && (
				<button onClick={() => onDelete(id)}>
					<DeleteIcon />
				</button>
			)}
			{!!onHide && (
				<button>
					<HideIcon />
				</button>
			)} */}
    </div>
  )
}
export default TableActions
