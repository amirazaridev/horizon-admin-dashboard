// import styled from "styled-components";

import { useNavigate } from "react-router";
import Button from "../../ui/Button";
import Tag from "../../ui/Tag";
import CheckoutButton from "./CheckoutButton";

// const StyledTodayItem = styled.li`
//   display: grid;
//   grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
//   gap: 1.2rem;
//   align-items: center;

//   font-size: 1.4rem;
//   padding: 0.8rem 0;
//   border-bottom: 1px solid var(--color-grey-100);

//   &:first-child {
//     border-top: 1px solid var(--color-grey-100);
//   }
// `;

// const Guest = styled.div`
//   font-weight: 500;
// `;
function TodayItem({ activity }) {
  const navigate = useNavigate();
  const { id, status, numNights, guest: { fullName } = {} } = activity;
  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: "9rem 10rem 5rem 7rem 9rem" }}
    >
      {status === "unconfirmed" && (
        <Tag inTable={false} color="green">
          Arriving
        </Tag>
      )}
      {status === "checked-in" && (
        <Tag inTable={false} color="blue">
          Departing
        </Tag>
      )}
      <div>{fullName}</div>
      <div>{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button isLink={true} onClick={() => navigate(`/checkin/${id}`)}>
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton id={id} inDashboard={true} />}
    </div>
  );
}

export default TodayItem;
