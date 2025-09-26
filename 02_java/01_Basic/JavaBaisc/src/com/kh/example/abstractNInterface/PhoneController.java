package com.kh.example.abstractNInterface;

public class PhoneController {
	String[] result= new String[2];
	
	public String[] method() {
		Phone[] phones = new Phone[2];
        phones[0] = new GalaxyNote9();
        phones[1] = new V40();

        // 각 객체 확인 후 printInformation() 호출
        for (int i = 0; i < phones.length; i++) {
            if (phones[i] instanceof SmartPhone) {  // SmartPhone으로 다운캐스팅 가능
                result[i] = ((SmartPhone) phones[i]).printInformation();
            }
        }

        return result;
	}

}
