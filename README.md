# Web_team_form

https://form.naver.com/list
https://form.naver.com/templates

[ 고영준 씨 ]
질문 박스 세 가지 (만들기, 설문하기, 결과)	<- page.css / .question_container
	질문 박스 디자인
	질문 자체에 focus 되면 박스에 border
	항목에 삭제 버튼

/*	page.css에서는 전체적으로 적용되는 것을 쓰고
	create, survey, result에 각각 다르게 적용되는 내용을 쓴다
	모두 question_container다
*/

[ 송채영 씨 ]
질문 옵션 1		<- create_new.html의 .question_0에서
	[옵션 추가], [기타 추가] 버튼
	[답변 필수], [복수 선택] 버튼
	템플릿 이미지들 모아주기

/*	네이버 폼 또는 현재 적용 중인 다크모드에 맞게 버튼
	단, 초록색은 사용을 생각해볼 것

	네이버 폼의 템플릿들 살펴보고 어울리는 이미지 찾아주기
	list_create에 들어갈 것들
*/

[ 전형원 씨 ]
질문 타입 드롭다운	<- create_template_0.html의 .question_0에서
	객관식
	주관식 단답형, 주관식 서술형
	별점형, 점수 선택형

/*	네이버 폼 또는 현재 적용 중인 다크모드에 맞게
	아이콘(이미지)을 포함해서 select와 option을 구성한다
	pages/images
*/

[ 김태현 씨 ]
사이드 바 박스	<- create_template_1.html의 .small_menu에서
	박스 만들기
	위치 오른 쪽에 고정하여 따라오게 만들기
	목차 만들기 (focus 되면 border)	<- 네이버 폼

/*	일단 박스를 만들고 위치를 absolute나 float 등으로 잡는다
	그 후 목차를 만들고 꾸미기란까지 들어갈 수 있도록 메뉴화한다
*/

[ 한준탁 씨 ]
사이드 바의 꾸미기란	<- element_sidebar.html
	주요 컬러
	글꼴 드롭다운과 글꼴 모아오기

/*	네이버 폼 참고
	내용이 어떤 박스나 div에 들어갔을 때 위치 조정이 필요없게 해야한다
*/