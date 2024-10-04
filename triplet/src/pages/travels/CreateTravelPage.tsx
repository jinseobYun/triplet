import { create } from 'domain';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { pageMove } from '../../features/navigation/naviSlice';
import BackHeader from '../../components/header/BackHeader';
import { ReactComponent as Calendar } from '../../assets/pay/calendar.svg';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { ReactComponent as Plus } from '../../assets/common/plus.svg';
import { ReactComponent as Minus } from '../../assets/common/minus.svg';


const s = {
  Container: styled.div`
    margin-top: 56px;
    padding: 0 16px;
  `,
  CalendarButton: styled.div`
    background-color: #F9FAFC;
    height: 44px;
    border: solid 1px #F0F0F0;
    border-radius: 10px;
    display: flex;
    /* justify-content: center; */
    width: 100%;
  `,
  CalendarText: styled.span`
    font-size: 12px;
    font-weight: 500;
    margin-left: 12px;
  `,
  CalendarTextArea: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    cursor: pointer;
  `,
  StyledDatePicker: styled(DatePicker)`
    text-align: center;
    border: none;
    font-size: 14px;
    font-weight: 500;
    color: #424242;
    background-color: #F9FAFC;
    pointer-events: none;
    outline: none;
    caret-color: transparent;
  `,
  InputText: styled.div`
    font-size: 12px;
    font-weight: 500;
    color: #424242;
    margin-bottom: 4px;
    margin-left: 4px;
  `,
  InputBoxArea: styled.div`
    width: 100%;
    display: flex;
  `,
  InputBox: styled.input`
    font-size: 14px;
    font-weight: 500;
    background-color: #F9FAFC;
    border: solid 1px #F0F0F0;
    border-radius: 10px;
    height: 44px;
    width: 100%;
    padding: 0 16px;
  `,
  DropDown: styled.select`
    font-size: 14px;
    font-weight: 500;
    background-color: #F9FAFC;
    border: solid 1px #F0F0F0;
    border-radius: 10px;
    height: 44px;
    width: 100%;
    padding: 0 16px;
  `,
  Number: styled.p`
    font-weight : 500;
    font-size : 14px;
  `,
  NumberArea: styled.div`
    display: flex;
    justify-content: center; /* 중앙 정렬 */
    align-items: center;
    background-color: #F9FAFC;
    border: 1px solid #F0F0F0;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    width: 106px;
    height: 44px;
    gap: 16px; /* 버튼과 숫자 사이의 간격 */
  `,
  CountArea: styled.div`
    display: flex;
    flex-direction: row;
  `,
  UnitText: styled.p`
    font-weight: 500;
    font-size: 14px;
    margin-left: 8px;
  `
}


const CreateTravelPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pageMove("travels"));
  }, []);

  const today =  new Date();
  const week = new Date(new Date().setDate(new Date().getDate() +3));

  const [dateRange, setDateRange] = useState<any | null>([today, week]);
  const [start, end] = dateRange;

  const dateInputRef = useRef<DatePicker>(null);
  
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDateOpen === true) {
      dateInputRef.current?.setFocus();
      setIsDateOpen(false);
    };
  }, [isDateOpen]);

  const [ isErrorOpen, setIsErrorOpen ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');
  const [ person, setPerson ] = useState(1);

  const errorOpen = () => {
    setIsErrorOpen(true);
  }

  const decreasePerson = () => {
    if(person === 1){
      setErrorMsg("인원수는 1 이상이어야 합니다.");
      errorOpen();
      return;
    }
    setPerson(person-1);
  }

  const increasePerson = () => {
    setPerson(person+1);
  }

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>();
  const [changeImg, setChangeImg] = useState<File>();
  const [imgUrl, setImgUrl] = useState<string>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFilesArray = Array.from(e.target.files);
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as string);
          setImgUrl(URL.createObjectURL(file));
        };
        setChangeImg(newFilesArray[0]);
        reader.readAsDataURL(file);
      };
    };
  };


  

  return (
    <>
    <BackHeader title='여행 등록'/>
    <s.Container>
      <s.InputText>여행 제목</s.InputText>
      <s.InputBoxArea><s.InputBox placeholder='여행 제목을 입력하세요.'></s.InputBox></s.InputBoxArea>
      <s.InputText>여행 일정</s.InputText>
      <s.CalendarButton>
        <s.CalendarTextArea onClick={() => setIsDateOpen(true)}>
          <Calendar/>
          <s.StyledDatePicker
            selectsRange={true}
            startDate={start}
            endDate={end}
            minDate={today}
            onChange={((range: any) => setDateRange(range))}
            dateFormat={"yyyy.MM.dd"}
            ref={dateInputRef}
          />
        </s.CalendarTextArea>
      </s.CalendarButton>
      <s.InputText>여행 국가</s.InputText>
      <s.DropDown>
        <option value="dd">선택</option>
        <option value="dd">ㄴㅇㄹ</option>
      </s.DropDown>
      <s.InputText>여행 인원</s.InputText>
      <s.CountArea>
        <s.NumberArea>
          <Minus onClick={decreasePerson}></Minus>
          <s.Number>{person}</s.Number>
          <Plus onClick={increasePerson}></Plus>
        </s.NumberArea>
        <s.UnitText>명</s.UnitText>
      </s.CountArea>
      <s.InputText>여행 이미지</s.InputText>
      <button onClick={() => {
        fileInputRef.current?.click()
      }}>bbbb</button>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple
        style={{display: 'none'}}
        onChange={handleImageUpload}
      />
      <button>test</button>
    </s.Container>
    </>
  );
};

export default CreateTravelPage;