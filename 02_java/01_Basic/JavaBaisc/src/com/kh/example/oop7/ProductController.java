
package com.kh.example.oop7;

public class ProductController {
	
	Product[] pro = new Product[10];
	int index =3;

	public ProductController() {
		pro[0] = new Product("갤럭시", 1200000, "삼성");
		pro[1] = new Product("아이폰", 1300000, "애플");
		pro[2] = new Product("아이패드", 800000, "애플");
	}
	
	public boolean insertProduct(String pName, int price, String brand) {
	    for (int i = 0; i < pro.length; i++) {
	        if (pro[i] == null) { // 가장 먼저 만나는 비어있는 값에
	            pro[i] = new Product(pName, price, brand); // 새로운 값 추가
	            return true; // 성공적으로 추가했음
	        }
	    }
	    return false; // 배열이 꽉 차서 추가 실패
	}


    public Product[] selectProduct() {
        return pro;
    }
	
    //최근 추가 상품 삭제
    public boolean deleteProduct() {
       for(int i = pro.length-1; i>=0; i--) {
    	   if(pro[i] !=null) {
    		   pro[i] = null;
    		   return true;
    	   }
       } return false;
    }
    
    //전달받은 key를 상품명을 통한 검색으로 검색도니 상품 목록을 반환
    public boolean searchProduct(String key) {
    	for (int i = 0; i < pro.length; i++) {
            if (pro[i] != null && pro[i].getpName().contains(key) ||  String.valueOf(pro[i].getPrice()).contains(key)  ||  pro[i].getBrand().contains(key) ) {
                System.out.println(pro[i].inform()); 
                return true;
            }
        } return false;
    }
    
    public boolean updateProductPrice(String pName, int price) {
    	for (int i = 0; i < pro.length; i++) {
            if (pro[i] != null && pro[i].getpName().contains(pName) ) {
                pro[i].setPrice(price);; 
                return true;
            }
        } return false;
    }
    
   
}
