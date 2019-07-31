var strReplace = /뎐삼]/gi; // 차단할 닉네임입니다.


function delete_row(e)
{
	var row = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	//if(row.tagName == 'TR' && e.parentNode.parentNode.className != 'box02a_bbsabody')
	if(row.tagName == 'TR')
	{
		row.parentNode.replaceChild(document.createElement('TR'), row);
	}
};


function check_writer(writer)
{
	var temp = "" + writer;
	var oriName = temp.replace("/[", "").replace("]/gi", "");

	var strCheck = 'style="cursor:hand">'+oriName+'</span></b>&nbsp;';		// 작성자 부분 야매로 떼옴
	var checkElem = document.documentElement.innerHTML;

	var bWriter = checkElem.indexOf(strCheck) != -1;

	// 차단유저가 작성한 글이면 뒤로 보냅니돠...
	if(bWriter)
	{
		history.back();
	}
}


// 게시글의 댓글 삭제
function delete_row_comment(e)
{
	var row = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	if(row.tagName == 'TR')
	{
		row.parentNode.replaceChild(document.createElement('TR'), row);
	}
}



// 메인화면에서의 리스트 삭제
function delete_row_main(e)
{
	var row = e.parentNode.parentNode.parentNode;
	if(row.tagName == 'TR')
	{
		row.parentNode.replaceChild(document.createElement('TR'), row);
	}
}


var strCurrentURL= window.location.href;		// URL을 얻어옵니다.
var bMain = (strCurrentURL.indexOf("board") == -1); // Main화면인지 체크합니다.
var bDetail = ((strCurrentURL.indexOf("&no=") != -1) || (strCurrentURL.indexOf("-no-") != -1) );	// 게시글인지 확인.

var bMemberBoard =	// 일반유저가 작성 가능한 게시판인지 체크합시다.
(
strCurrentURL.indexOf("GAMECODI_Talk") != -1				// 일상만담
|| strCurrentURL.indexOf("GAMECODI_TalkDev") != -1			// 개발만담
|| strCurrentURL.indexOf("GAMECODI_politics") != -1			// 이슈판		
|| strCurrentURL.indexOf("GAMECODI_Progress") != -1			// 지금은 개발중
|| strCurrentURL.indexOf("GAMECODI_Request") != -1			// 무리수 건의함
|| strCurrentURL.indexOf("GAMECODI_HDD") != -1				// 이미지 HDD
|| strCurrentURL.indexOf("GAMECODI_QnA") != -1				// 인생 질문답변
|| strCurrentURL.indexOf("GAMECODI_Wanted") != -1			// 만물구인 파티구함
|| strCurrentURL.indexOf("GAMECODI_Bluff") != -1			// 허세종결자
|| strCurrentURL.indexOf("GAMECODI_Advice") != -1			// 선배의 조언
|| strCurrentURL.indexOf("GAMECODI_Book") != -1				// 책좀 읽어요
|| strCurrentURL.indexOf("GAMECODI_Marriedclub") != -1		// 유부클럽
|| strCurrentURL.indexOf("GAMECODI_Resign") != -1			// 익명게시판
|| strCurrentURL.indexOf("GAMECODI_NewTitle") != -1			// 신작게시판
);	

var strReplaceString = '[차단8]';
var bUnknown = strCurrentURL.indexOf("GAMECODI_Resign") != -1;	 // 익명게시판 여부. 추후 익게 별도 필터링이 필요한 경우 씁시다. (해시)

if(bMain)	// 메인페이지에서 지웁니다.
{
	var elements = document.getElementsByTagName('span');
	var elementsToRemoveMain = new Array();						// 지울 목록 배열

	for (var i = 0; i < elements.length; i++) 
	{
		var element = elements[i];

		for (var j = 0; j < element.childNodes.length; j++) 
		{
			var node = element.childNodes[j];
			if (node.nodeType == 3) 
			{
				var text = node.nodeValue;
				var replacedText = text.replace( strReplace, strReplaceString + element.tagName );

				if (replacedText !== text) 
				{
					elementsToRemoveMain.push(node);				
					break;
				}
			}
		}
	}

	for (var i = 0; i < elementsToRemoveMain.length; i++)
	{
		delete_row_main(elementsToRemoveMain[i]);
	}

}
else
{
	if(bMemberBoard)
	{
		if(bDetail)	// 작성글 상세 보기
		{
			check_writer(strReplace);	// 글쓴이 체크
			// 이제 댓글을 삭제하도록 하죠

			var elements = document.getElementsByTagName('span');
			var elementsToRemoveComment = new Array();						// 지울 목록 배열

			for (var i = 0; i < elements.length; i++) 
			{
				var element = elements[i];
				if(element.parentNode)
				{
					var checkComment = "" + element.parentNode.innerHTML;
					var temp = "" + strReplace;
					var oriName = temp.replace("/[", "").replace("]/gi", "");
					var checkString = 'style="cursor:hand">'+oriName+'</span>';
					var bComment = checkComment.indexOf(checkString) != -1;

					if(bComment)
					{
						elementsToRemoveComment.push(element);
					}
				}
			}

			for (var i = 0; i < elementsToRemoveComment.length; i++)
			{
				delete_row_comment(elementsToRemoveComment[i]);
			}


		}
		
		// 게시글 목록
		var elementsToRemove = new Array();						// 지울 목록 배열
		var elements = document.getElementsByTagName('span');

		for (var i = 0; i < elements.length; i++) 
		{
			var element = elements[i];

			for (var j = 0; j < element.childNodes.length; j++) 
			{
				var node = element.childNodes[j];
				if (node.nodeType == 3) 
				{
					var text = node.nodeValue;

					var replacedText = text.replace( strReplace, strReplaceString + element.tagName );

					if (replacedText !== text) 
					{
						elementsToRemove.push(node);				
						break;
					}
				}
			}
		}

		for (var i = 0; i < elementsToRemove.length; i++)
		{
			delete_row(elementsToRemove[i]);
		}
	}
}