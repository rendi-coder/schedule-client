import styled from 'styled-components';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  margin-top: 20px;
`;

export const Title = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
`;

export const DayContainer = styled.div`
  margin-bottom: 20px;
`;

export const EmptyDay = styled.div`
  width: 100%;
  text-align: center;
`;

export const ActionBtn = styled.div`
  color: #1890ff;
  text-decoration: underline;
  font-size: 16px;
  cursor: pointer;
`;
