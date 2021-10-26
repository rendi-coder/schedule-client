import styled from 'styled-components';

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 95vh;
  position: relative;
`;

export const Loader = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  margin-top: 20px;
`;

export const Title = styled.span`
  font-size: 18px;
`;

export const DayContainer = styled.div`
  margin-bottom: 20px;
`;

export const EmptyDay = styled.div`
  width: 100%;
  text-align: center;
`;
