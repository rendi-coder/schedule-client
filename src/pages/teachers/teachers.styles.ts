import styled from 'styled-components';
import { Button } from 'antd';

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
  max-width: 1000px;
  margin-top: 20px;
`;

export const Title = styled.span`
  font-size: 18px;
`;

export const AddNewBtn = styled(Button)`
  width: 150px;
  margin-bottom: 15px;
`;
