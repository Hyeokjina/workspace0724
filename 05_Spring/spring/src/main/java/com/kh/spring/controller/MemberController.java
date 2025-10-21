package com.kh.spring.controller;

import com.kh.spring.model.vo.Member;
import com.kh.spring.service.MemberService;
import com.kh.spring.service.MemberServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

//Bean에 class등록하는 방법으로 @Component를 클래스에 부여한다.
//@Controller -> @Component + Controller객체가 가질 수 있는 예외처리등의 기능을 포함하는 어노테이션
@Controller
public class MemberController {

    /*
    @Autowired
    의존성 주입을 사용할 때 기술하는 어노테이션
    클래스내에 필요한 객체를 직접생성하지압ㅎ고 spring컨테이너가 관리하는 객체(Bean에 등록)를 주입받아 사용 할 수 있게 해줌.
     */
    @Autowired
    private MemberService memberService;

    /*
    Spring에서 클라이언트가 HTML폼데이터로 보낸 정보를 받는 방법

    1. HttpServletRequest를 활용해서 전달값을 가져옴.
    메서드에 매게변수로 HttpServletRequest를 작성해주면
    스프링컨테이너가 해당 메서드를 호출할 때 자동으로 매게변수로 주입
     */
    /*
    @PostMapping("login.me")
    public String login(HttpServletRequest request, HttpServletResponse response){
        String id = request.getParameter("userId");
        String pw = request.getParameter("userPwd");
        System.out.println(id);
        System.out.println(pw);

        return null;
    }
     */

    /*
    2. @RequestParam 어노테이션을 활용하는 방법
    request.getParameter(키)로 벨류를 추출하는 역할을 대신 해주는 어노테이션
    요청  parameter의 key값과 동일하게 매게변수명을 설정해주면 @RequestParam어노테이션을 생략해도 됨.
     */
    /*
    @PostMapping("login.me")
    public String login(@RequestParam(value = "userId", defaultValue = "user01") String id, String userPwd){
        System.out.println(id);
        System.out.println(userPwd);

        return null;
    }
     */

    /*
    * 3. 객체를 이용하는 방법(@ModelAttribute생략가능)
    * 요청시 전달값들을 담고자하는 클래스 타입의 객체를 만들어 준 뒤
    * 전달되는 key값과 매개변수 객체의 필드명을 동일하게 만들어주면 객체에 전달값을 맵핑해준다.
    * */
    /*
    @PostMapping("login.me")
    public String login(@ModelAttribute Member member){
        System.out.println(member);
        return null;
    }
    */

    /*
    * 요청처리 후에 데이터를 담아서 응답하는 방법(포워딩 or url재요청)
    * 1.String에서 제공하는 Model객체를 이용하는 방법
    * 포워딩할 응답뷰로 전달하고자 하는 데이티를 k-v쌍으로 담을 수 있는 영역
    * Model객체에 addAtribute()로 저장시 requestScope에 값을 저장하게 됨.
    * */
    /*
    @PostMapping("login.me")
    public String login(@ModelAttribute Member member, Model model) {
        System.out.println(member);

        model.addAttribute("memberId", member.getMemberId());
        model.addAttribute("memberPwd", member.getMemberPwd());
        return null;
    }
    */

    /*
    * HttpSession을 이용한 값 저장 후 url 재요청
    */
    /*
    @PostMapping("login.me")
    public String login(@ModelAttribute Member member, HttpSession session) {
        System.out.println(member);

        session.setAttribute("memberId", member.getMemberId());
        session.setAttribute("memberPwd", member.getMemberPwd());

        return "redirect:/";
    }
    */

    /*
    *  3. ModelAndview객체를 이용하는 방법 -> 데이터를 담고 리턴형식까지 지정할 수 있음
    * */
    /*
    @PostMapping("login.me")
    public String login(@ModelAttribute Member member, ModelAndView mv) {
        System.out.println(member);

        mv.addObject("memberId", member.getMemberId());
        mv.addObject("memberPwd", member.getMemberPwd());

        //mv.setViewName("index"); //포워딩
        mv.setViewName("redirect:/"); //url요청
        return "mv";
    }
     */

    @PostMapping("login.me")
    public String login(@ModelAttribute Member member) {
        System.out.println(member);

        memberService.loginMember(member);


    }
}