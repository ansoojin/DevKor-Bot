# Summary

Channel Open Api 와 Webhook을 사용하여 TeamChat에서 사용할만한 여러가지 기능을 구현하였습니다.

## Random Selection 기능
Keyword : "명"  
"명"이 포함된 메세지를 TeamChat에 입력하면, 해당 Group 내에서 명수만큼 랜덤으로 골라줍니다.
- Examples  
![randomSelect](docs/randomSelect1.png)
![randomSelect2](docs/randomSelect2.png)
![randomSelect3](docs/randomSelect3.png)
    음수를 입력한 경우, 양수로 변환 후 골라줍니다.
![randomSelect4](docs/randomSelect4.png)
    소수점을 입력한 경우, 내림을 하고 그 수 만큼 골라준 뒤, 추가 한명을 뽑아 이름의 반절만 보여줍니다. 

## Stop 기능 
Keyword : "/멈춰"
- 급한 상황에 메세지를 통해 서버를 종료시키는 기능입니다.
- Example
![stop](docs/stop.png)


## News 기능
평일 오전 9시에 BBC Tech News 의 최상단에 있는 뉴스를 하나 메세지로 전송해줍니다.
Keyword : "/뉴스"
- Example
![news](docs/news.png)
바로가기 버튼을 클릭하면 해당 뉴스기사로 이동합니다.
*** 

