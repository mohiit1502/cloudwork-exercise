import React, { useEffect } from 'react';
import TimeAgo from 'react-timeago';
import { Status } from '../../state/workloads'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootAction } from '../../state';
import { updateStatus } from '../../state/workloads/actions';

const statusMap = {CANCELED: "Cancelled", SUCCESS: "Successful", FAILURE: "Failed"};
export interface WorkloadItemStateProps {
  id: number;
  complexity: number;
  status: Status;
  completeDate: Date;
}

export interface WorkloadItemMethodProps {
  onCancel: () => void;
  nowHandler: () => number;
}

export interface WorkloadItemProps extends 
  WorkloadItemStateProps,
  WorkloadItemMethodProps {}


const WorkloadItem: React.SFC<WorkloadItemProps> = (props) => {
  // console.log(props.completeDate)

  return <div className="WorkloadItem border p-4 mb-4 d-flex">
    <div className="primary-details">
      <h3 className="WorkloadItem-heading">Workload #{props.id}</h3>
      <span className="WorkloadItem-subHeading">Complexity {props.complexity}</span>
    </div>
    <div className="d-flex">
      {props.status === 'WORKING'
        ? (
          <>
            <span className="my-auto"><TimeAgo date={props.completeDate} now={props.nowHandler} /></span>
            <button 
              className="WorkloadItem-secondaryButton ml-3 my-auto" 
              onClick={props.onCancel}
            >
              Cancel
            </button>
          </>
        )
        : (
          <span className="WorkloadItem-statusText my-auto">{statusMap[props.status]}</span>
        )
      }
    </div>
  </div>
};


const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  udpateWorkloadStatus: (id: number, status: Status) => dispatch(updateStatus({ id, status })),
}) 

const WorkloadItemContainer = connect(null, mapDispatchToProps)(WorkloadItem);

export { 
  WorkloadItem,
  WorkloadItemContainer
};

export default WorkloadItem;