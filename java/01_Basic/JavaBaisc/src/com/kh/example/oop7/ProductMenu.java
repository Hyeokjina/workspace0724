package com.kh.example.oop7;

import java.util.Scanner;

public class ProductMenu {
	private Scanner sc = new Scanner(System.in);
	private ProductController pc= new ProductController();
	
	public void mainMenu() {
		while(true) {
		System.out.println("====== 상품 관리 메뉴 ======");
		System.out.println("1. 상품 추가");
		System.out.println("2. 상품 전체 조회");
		System.out.println("3. 상품 삭제");
		System.out.println("4. 상품명 키워드 검색");
		System.out.println("5. 상품 가격 수정");
		System.out.println("9. 프로그램 종료");
		System.out.print("메뉴 번호 : ");
		
		int sel= sc.nextInt();
		sc.nextLine();
		
		switch(sel) {
		case 1:
			insertProduct();
			break;
		case 2:
			selectProduct();
			break;
		case 3:
			deleteProduct();
			break;
		case 4:
			searchProduct();
		case 5:
			updateProductPrice();
			break;
		case 9:System.out.println("프로그램을 종료합니다.");
			return;
		default:
			System.out.println("잘못 입력하셨습니다. 다시 입력해 주세요");
			break;
		}	
		
		}
	}
	
	public void updateProductPrice() {
		System.out.print("변경할 상품명 입력 : ");
		String pName = sc.nextLine();
		System.out.print("변경 가격 입력 : ");
		int price = sc.nextInt();
		
		boolean result = pc.updateProductPrice(pName, price);
		
		if(result) {
			System.out.println("가격 변경을 완료했습니다.");
		} else {
			System.out.println("가격 변경에 실패했습니다.");
		}
		
	}
	
	// 가장 최근에 추가된 상품을 제거 하고 성공여부를 출력
	public void deleteProduct() {
		boolean result = pc.deleteProduct();
		
		if(result) {
			System.out.println("가장 최근에 추가된 상품을 성공적으로 삭제했습니다.");
		} else {
			System.out.println("삭제에 실패했습니다.");
		}
	}
		
	
	// 키워드를 입력받아 제품명을 통한 키워드 검색을 하여 제품목록을 출력
	public void searchProduct() {
		System.out.print("키워드 입력 : ");
		String key = sc.nextLine();
		
		boolean result = pc.searchProduct(key);
		
		if(result) {
			System.out.println("검색 성공");
		} else {
			System.out.println("검색 실패");
		}

	   
		
	}
	
	public void insertProduct() {
		System.out.print("추가할 상품명 :");
		String name = sc.nextLine();
		
		System.out.print("추가할 가격 : ");
		int price = sc.nextInt();
		System.out.print("추가할 브랜드 : ");
		String brand = sc.next();
		sc.nextLine();
		
		boolean result = pc.insertProduct(name, price, brand);
		
		if (result) {
	        System.out.println("상품 추가 성공!");
	    } else {
	        System.out.println("상품 추가 실패 (배열이 가득 찼습니다)");
	    }
	}
		
	
	
	public void selectProduct() {
		Product[] productArr = pc.selectProduct();
		
		if(productArr != null && productArr[0] != null	) {
			for(Product p : productArr) {
				if(p == null) {
					return;
				}
				System.out.println(p.inform());
			}
		}else {
			System.out.println("상품이 존재하지 않습니다.");
		}
	}
	
	
	
}
