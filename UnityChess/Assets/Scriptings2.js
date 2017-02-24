import System;
import UnityEngine.SceneManagement;
import UnityEngine.UI;
import c0_4unity_chess;


var whiteb:Button;
var blackb:Button;
// This is the main scripting part...

var Name="Various javascripts";
var FirstStart=true;
var drawAnim=false;						// Animation /or fastest visual performance by redrawing...

var toPromote=0;						// Promotion option (0-Q,1-R,2-B,3-N)...

var drag1_at="";								// square with a piece dragged after the first drag...
var drag1_animator:int=0;						// On drag start animation -counter

var move_animator:int=2;					// Animation counter when a piece is moving...

var mouse_at="";							// Keeps last mouse square at... (just for legal moves suggestion by using particle)

var message2show="";						// Message to show on GUI
var engineStatus=0;

var gameover=false;						// is true when the game is over...

var TakeBackFlag=false;					// true on takeback-button was pressed...

var NewGameFlag=false;					// true on new game-button was pressed...

var LanguageFlag=false;

var chess_strength=1;

var mode=0;

var setCamSide=true;
var setCamSide2=false;

public var C0:c0_4unity_chess = new c0_4unity_chess();

var StockfishAccessible=false;			// Script sets true on Stockfish is accessible...
var useStockfish=true;					// toggled by user if use...

var english = true;
var finnish=false;
var irish=false;
var koreanish=false;
// GUI interface on screen...
var lang_flag = 0; //default 0 English, 1 Irish, 2 Finnish, 3 Koreanish

var promo2Queen = true;
var promo2Rook = false;
var promo2Bishop = false;
var promo2Knight = false;




var menuArr = 
	[
		[ "English", "New Game", "Take Back", "Animation", "Top Camera", "Side Camera", "Brightness", "Promotion", "Pawn", "Rook", "Bishop", "Knight", "Queen", "Your Move...", "Calculating...", "Language", "English", "Irish", "Finnish", "Korean", "check!!!", "Black Turn", "White Turn", "Exit Game", "Set Mode", "OK" ],
		[ "Gaeilge", "Cluiche Nua", "Tóg ar Ais", "Beochan", "Ceamara Barr", "Ceamara Taobh", "Gile", "Uasghrádú", "Ceitheranach", "Caisléan", "Easpag", "Ridire", "Banríon", "Do Imirt...", "Ag Ríomh...", "Teanga", "Bearla", "Gaeilge", "Fionlainnis", "Cóiréis", "Seiceáil!!!", "Dubh Imirt", "Bán Imirt", "Scoir", "Athraigh Mód","Maith"],
		[ "Suomi", "Uusi Peli", "Kumoa", "Animaatiot", "Yläkamera", "Sivukamera", "Kirkkaus", "Korottuminen", "Sotilas", "Torni", "Lähetti", "Hevonen", "Kuningatar", "Sinun Vuorosi...", "Lasketaan...", "Kieli", "Englanti", "Irlanti", "Suomi", "Korea", "shakki!!!", "mustan vuoro", "valkoisen vuoro", "Poistu pelistä", "Valitse pelimuoto", "OK"],
		[ "한국어", "새 게임", "한 수 무르기", "애니메이션", "위에서 보기", "옆에서 보기", "조명", "프로모션", "폰", "룩", "비숍", "나이트", "퀸", "플레이어 차례..."/*13*/, "계산 중...", "언어"/*15*/, "영어", "아일랜드어", "핀란드어", "한국어", "체크!!!"/*20*/, "검은색 차례", "흰색 차례", "게임 종료"/*23*/, "모드 설정", "확인"]
	];
//String Array for Menu
	
var white="w";
var black="b";
var temp="";	

var restart=false;
var quit=false;
var alert=false;
var hide=false;
function setMeOnly():boolean{	//for mutllingual
    english = finnish = irish = koreanish = false;
    return true;
}

    function setMeOnly2():boolean{	//for Promotions
        promo2Queen = promo2Rook = promo2Bishop = promo2Knight = false;
        return true;
    }
    /*
        function OnGUI () {
            var e : Event = Event.current;
	
	
	
            if(FirstStart) {
                GUI.Box (Rect ((Screen.width-120)/2, (Screen.height-90)/2, 120, 90), "");
                if(GUI.Button (Rect ((Screen.width-100)/2, (Screen.height-90)/2 +10, 100, 30), "VS Computer")) {mode=1;} 
                if(GUI.Button (Rect ((Screen.width-100)/2, (Screen.height-90)/2+50, 100, 30), "VS Player")) {mode=2;}
            }
            else {
                GUI.Box (Rect (10, 25, 130, 40), message2show);
                if(engineStatus==1) { engineStatus=2; }
		
                GUI.Box (Rect (10, 70, 130, 255), "");
                if(GUI.Button (Rect (20, 80, 110, 30), menuArr[lang_flag][2])) TakeBackFlag=true;
                if(GUI.Button (Rect (20, 120, 110, 30), menuArr[lang_flag][1])) NewGameFlag=true;
                if(GUI.Button (Rect (20, 240, 110, 30), menuArr[lang_flag][23])) {quit=true;}
                if(GUI.Button (Rect (20, 280, 110, 30), menuArr[lang_flag][24])) {restart=true;}

                //GUI.Box (Rect (Screen.width - 130, 90-65, 120, 110), menuArr[lang_flag][7]);	//-65
                //GUI.Label (Rect (Screen.width - 90, 110-65, 90, 22), menuArr[lang_flag][12]);
                //GUI.Label (Rect (Screen.width - 90, 130-65, 90, 22), menuArr[lang_flag][9]);
                //GUI.Label (Rect (Screen.width - 90, 150-65, 90, 22), menuArr[lang_flag][10]);
                //GUI.Label (Rect (Screen.width - 90, 170-65, 90, 22), menuArr[lang_flag][11]);
                //toPromote = GUI.VerticalSlider (Rect (Screen.width - 110, 115-65, 80, 72), toPromote, 0, 3);
		

                GUI.Box (Rect (Screen.width - 130, 90-65, 120, 110),  menuArr[lang_flag][7]);
                promo2Queen = GUI.Toggle (Rect (Screen.width - 90, 110-65, 90, 22), promo2Queen, menuArr[lang_flag][12]);
                if(promo2Queen == true) { promo2Queen = setMeOnly2(); toPromote = 0;}
                promo2Rook = GUI.Toggle (Rect (Screen.width - 90, 130-65, 90, 22), promo2Rook, menuArr[lang_flag][9]);
                if(promo2Rook == true) { promo2Rook = setMeOnly2(); toPromote = 1;}
                promo2Bishop = GUI.Toggle (Rect (Screen.width - 90, 150-65, 90, 22), promo2Bishop, menuArr[lang_flag][10]);
                if(promo2Bishop == true) { promo2Bishop = setMeOnly2(); toPromote = 2;}
                promo2Knight = GUI.Toggle (Rect (Screen.width - 90, 170-65, 90, 22), promo2Knight, menuArr[lang_flag][11]);
                if(promo2Knight == true) { promo2Knight = setMeOnly2(); toPromote = 3;}
		
                GUI.Box (Rect (Screen.width - 130, 270-65, 120, 100), menuArr[lang_flag][15]);
                english=GUI.Toggle (Rect (Screen.width - 100, 290-65, 90, 22), english, menuArr[lang_flag][16]);
                if(english == true) { english = setMeOnly(); lang_flag = 0;}
                irish=GUI.Toggle (Rect (Screen.width - 100, 310-65, 90, 22), irish, menuArr[lang_flag][17]);
                if(irish == true) { irish = setMeOnly(); lang_flag = 1;}
                finnish=GUI.Toggle (Rect (Screen.width - 100, 330-65, 90, 22), finnish, menuArr[lang_flag][18]);
                if(finnish == true) { finnish = setMeOnly(); lang_flag = 2;}
                koreanish=GUI.Toggle (Rect (Screen.width - 100, 350-65, 90, 22), koreanish, menuArr[lang_flag][19]);
                if(koreanish == true) { koreanish = setMeOnly(); lang_flag = 3;}
		

		
                if(mode==1) {
                    GUI.Box (Rect (Screen.width - 130, 140, 120, 60), "Chess strength");
                    if(GUI.Button (Rect (Screen.width - 135, 160, 65, 20), "Easy")) {chess_strength=1;}
                    if(GUI.Button (Rect (Screen.width - 70, 160, 65, 20), "Normal")) {chess_strength=2;}
                    if(GUI.Button (Rect (Screen.width - 135, 180, 65, 20), "Hard")) {chess_strength=3;}
                    if(GUI.Button (Rect (Screen.width - 70, 180, 65, 20), "Extreme")) {chess_strength=5;}
                }
            }
            if(alert&&hide) {
                GUI.Box (Rect ((Screen.width-120)/2, (Screen.height-60)/2, 120, 60), menuArr[lang_flag][20]); 
                if(GUI.Button (Rect ((Screen.width-100)/2, (Screen.height-60)/2+25, 100, 30), menuArr[lang_flag][25])) {hide=false;}
            }
            if(gameover) {
                GUI.Box (Rect ((Screen.width-120)/2, (Screen.height-155)/2, 120, 155), "");
                if(GUI.Button (Rect ((Screen.width-100)/2, (Screen.height-155)/2+10, 100, 30), menuArr[lang_flag][1])) {NewGameFlag=true;}
                if(GUI.Button (Rect ((Screen.width-100)/2, (Screen.height-155)/2+80, 100, 30), "Set Mode")) {restart=true;}
                if(GUI.Button (Rect ((Screen.width-100)/2, (Screen.height-155)/2+115, 100, 30), "Exit Game")) {quit=true;}
            }
        }
        */
        function Start ()	{
         

            // Hide objects that are not visually needed... 
            //(script 3d objects are just for scripting purposes, to hold chess programs and activate them frequently (frames per second)...
	
            GameObject.Find("Script2").GetComponent.<Renderer>().enabled = false;			// Scriptings
            GameObject.Find("Script6").GetComponent.<Renderer>().enabled = false;			// StockfischCall
            ActivateCamera(true);
	
	
	
    //        GameObject.Find("StartupSplash").GetComponent.<GUITexture>().enabled = true;
      //      yield WaitForSeconds(5);
       //     GameObject.Find("StartupSplash").GetComponent.<GUITexture>().enabled = false;
        }

        // frames per second run part...
        function Update ()	{

       if (white=="w")
       {
       whiteb.gameObject.SetActive(true);
       blackb.gameObject.SetActive(false);
       }else
       {
         whiteb.gameObject.SetActive(false);
       blackb.gameObject.SetActive(true);
       }

        // added to restart if game Over !!!!!!!!!!!!!!!!!!!!!!!!
	if (gameover){Application.LoadLevel (0);}

            if (restart) {  
                Application.LoadLevel (0);  
            }  
            if (quit) {
                Application.Quit();
            }
 
	
	
            if(!C0.c0_moving)	ActivateCamera(false);
            if(FirstStart) {// could be right in Start(), anyway it's the same..., sometimes good to wait a bit while all the objects are being created...		
                if(mode==1 || mode==2) {
                    PlanesOnBoard();					// Planes needed for mouse drag... (a ray from camera to this rigibody object is catched)...
                    TransformVisualAllToH1();		// The board contains blank-pieces (to clone from) just on some squares. Moving all of them to h1... 
		
                    //1.FEN startup test (ok):	
                    //C0.c0_start_FEN="8/p3r1k1/6p1/3P2Bp/p4N1P/p5P1/5PK1/8 w - - 0 1";
                    //C0.c0_set_start_position("");
                    //print(C0.c0_get_FEN());
				
                    //C0.c0_start_FEN="7k/Q7/2P2K2/8/8/8/8/8 w - - 0 70";		// a checkmate position just for tests...
		
                    C0.c0_side=1;							// This side is white.   For black set -1
                    C0.c0_waitmove=true;					// Waiting for mouse drag...
                    C0.c0_set_start_position("");		// Set the initial position... 
                }
            }
	
            DoPieceMovements();							// All the movements of pieces (constant frames per second for rigidbody x,y,z)...
            if(mode==1) DoEngineMovements();							// If chess engine should do a move...
            else if(mode==2) checkGameover();
            MouseMovement();								// Mouse movement events, suggest legal moves...
            RollBackAction();									// If a takeback should be performed/ or new game started..

            if(FirstStart)	{
                position2board();					// Set current position on the board visually...
                HideBlankPieces();					// Hide blank-pieces...
                if(mode==1 || mode==2) {
                    FirstStart=false;
                }
            }
            else	{
                DragDetect();						// If mouse pressed on any square...
            }


            // added here  *********************************************
             if(FirstStart) {
             mode=2;
             }else
		{ if(engineStatus==1) { engineStatus=2; }}
		//*****************************************************************

        }
        function SetBACKPlay()
{TakeBackFlag=true;}


        function ActivateCamera(first:boolean):void
        {
            var c1=(GameObject.Find("CameraSide")).GetComponent.<Camera>();
            var c2=(GameObject.Find("CameraSide2")).GetComponent.<Camera>();
	
            if(first)	{
                c1.enabled=setCamSide;
                c2.enabled=setCamSide2;
            }
            else	{
                if(mode == 2)	{
                    if((!c1.enabled) && setCamSide && white == "w") { setCamSide2=false; c1.enabled=true; c2.enabled=false; }
                    if((!c2.enabled) && setCamSide2 && white != "w") { setCamSide=false; c2.enabled=true; c1.enabled=false; }
                }
            }
        }

        function Revert_at(ats:String):String	{	
            var horiz=System.Convert.ToChar( System.Convert.ToInt32("a"[0]) + (System.Convert.ToInt32("h"[0]) - System.Convert.ToInt32(ats[0])) );
            var vert=(9 - System.Convert.ToInt32( ats.Substring(1,1) ) ).ToString();
            return horiz+vert;
        }

            function MouseMovement():void	{
                if((drag1_at.length==0) || C0.c0_moving || ((mouse_at.length>0) && (!(drag1_at==mouse_at))))		{
                    mouse_at="";
            }
	
            if((drag1_at.length>0) && (!C0.c0_moving))		{
                // We need to actually hit an object
                var hit : RaycastHit;
                if(Physics.Raycast( Camera.main.ScreenPointToRay(Input.mousePosition),  hit, 1000)  )//&& (!(hit.rigidbody==null)))	
                {
                    var at="";
                    for(var h=0;h<8;h++)
                        for(var v=8;v>0;v--)			{
                            var id="plane_"+System.Convert.ToChar(System.Convert.ToInt32("a"[0])+h)+v.ToString();		// Is this square mouse is over?
                            var qObj=GameObject.Find(id);
                            if((!(qObj==null)) && (qObj.transform.position==hit.collider.transform.position)) at=id.Substring(6,2);
                        }	
			
                    if(at.length>0)		{
                        if(C0.c0_side<0) at=Revert_at(at);
                    }
                }
            }
        }

        function DragDetect():void
        {
            var q2Obj:GameObject; // was just var
            var   q3Obj:GameObject; // was just var
            var Piece2promote;
            // Make sure the user pressed the mouse down
            if (!Input.GetMouseButtonDown (0)) return;

            // We need to actually hit an object
            var hit : RaycastHit;
            if (Physics.Raycast( Camera.main.ScreenPointToRay(Input.mousePosition),  hit, 1000) )//&& (!(hit.rigidbody==null)))	
            {
                if(!C0.c0_moving)	{	// If no piece is moving right now... (this animation algorithm is not good for the blitz-playing)
                    if(C0.c0_waitmove)		{	// If waiting for action only...
                        var at="";
                        for(var h=0;h<8;h++)
                            for(var v=8;v>0;v--)	{
                                var id="plane_"+System.Convert.ToChar(System.Convert.ToInt32("a"[0])+h)+v.ToString();		// Is this square dragged?
                                var qObj=GameObject.Find(id);
                                if((!(qObj==null)) && (qObj.transform.position==hit.collider.transform.position)) at=id.Substring(6,2);
                            }	

                        if(at.length>0)		{
                            if(C0.c0_side<0) at=Revert_at(at);
                            if(drag1_at.length>0)	{
                                q2Obj=GameObject.Find("plane_"+((C0.c0_side<0)?Revert_at(drag1_at):drag1_at) );
                               // if(!(q2Obj==null)) q2Obj.renderer.enabled=false;
                               if(!(q2Obj==null)) q2Obj.GetComponent.<Renderer>().enabled=false;
                            }
						
                            var piecedrag=C0.c0_D_what_at(at);
					
                            if(mode==2) {
                                if((piecedrag.length>0 && piecedrag.Substring(0,1)==((C0.c0_side>0)?white:black))) {   // <- player vs player: white:black
                                    if(drag1_animator==0)	{		// If the previous animation is over...			   	   // <- 		AI		 : black:white
                                        drag1_at=at;
                                        // added
                                        if(drawAnim) 
							{
							drag1_animator= GetTimeDelta(10,3);		// 3-seconds for animation...
							}
						else 
							{
                                        //********
                                        q3Obj=GameObject.Find("plane_"+((C0.c0_side<0)?Revert_at(drag1_at):drag1_at) );
                                        if(!(q3Obj==null)) 
                                        q3Obj.GetComponent.<Renderer>().enabled=true;
                                        } // added
                                    }
                                }
                                else	{
                                    Piece2promote="Q";
                                    if(toPromote==1) Piece2promote="R";
                                    else if(toPromote==2) Piece2promote="B";
                                    else if(toPromote==3) Piece2promote="N";
							
                                    C0.c0_become_from_engine=Piece2promote;
                                    if((drag1_at.length>0) && C0.c0_D_can_be_moved(drag1_at,at))	{
                                        C0.c0_move_to(drag1_at,at);
                                        C0.c0_sidemoves=-C0.c0_sidemoves;
                                        temp=white;
                                        white=black;
                                        black=temp;
								
                                        hide=true;
                                        alert=false;
                                        if(white=="w") {
                                            message2show ="WHITE TURN!";
                                            setCamSide=true;
                                            setCamSide2=false;
                                        }
                                        else {
                                            message2show ="BLACK TURN!";
                                            setCamSide=false;
                                            setCamSide2=true;
                                        }
                                    }
                                }
                            }
                            else if(mode==1) {
                                if((piecedrag.length>0 && piecedrag.Substring(0,1)==((C0.c0_side>0)?"w":"b"))) {
                                    if(drag1_animator==0)	{		// If the previous animation is over...
                                        drag1_at=at;
                                        q3Obj=GameObject.Find("plane_"+((C0.c0_side<0)?Revert_at(drag1_at):drag1_at) );
                                        if(!(q3Obj==null)) q3Obj.GetComponent.<Renderer>().enabled=true;
                                    }
                                }
                                else	{
                                    Piece2promote="Q";
                                    if(toPromote==1) Piece2promote="R";
                                    else if(toPromote==2) Piece2promote="B";
                                    else if(toPromote==3) Piece2promote="N";
							
                                    C0.c0_become_from_engine=Piece2promote;
							
                                    if((drag1_at.length>0) && C0.c0_D_can_be_moved(drag1_at,at))	{
                                        C0.c0_move_to(drag1_at,at);
                                        C0.c0_sidemoves=-C0.c0_sidemoves;
                                        hide=true;
                                        alert=false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        function PlanesOnBoard():void
        {
            var toObj: GameObject;
            var a8Obj = GameObject.Find("plane_a8");
            var h1Obj = GameObject.Find("plane_h1");
            var dx=(h1Obj.transform.position.x-a8Obj.transform.position.x)/7;
            var dy=(h1Obj.transform.position.y-a8Obj.transform.position.y)/7;
            var dz=(h1Obj.transform.position.z-a8Obj.transform.position.z)/7;
	
            for(var h=0;h<8;h++)
                for(var v=8;v>0;v--)	{
                    var id="plane_"+System.Convert.ToChar(System.Convert.ToInt32("a"[0])+h)+v.ToString();
                    if((!(id=="plane_a8"))&&(!(id=="plane_h1"))) 	{
                        toObj=Instantiate(a8Obj, a8Obj.transform.position+ Vector3(dx*h,dy*(Mathf.Sqrt(Mathf.Pow(h,2)+Mathf.Pow((8-v),2))),
                                dz*(8-v)),  a8Obj.transform.rotation); 
                        toObj.name=id;
                    }
                }
        }

        function TransformVisualAllToH1():void	{
            //Initial position:  Qd1, Ke1, Bf1, Ng1, Rh1, ph2, oponent'sNg3...
            // Coord-s should be adjusted according to piece type... the problem is that can't move piece to one x,y,z - looks different 
            TransformVisualPieceToH1("bishop","f1");
            TransformVisualPieceToH1("queen","d1");
            TransformVisualPieceToH1("king","e1");
            TransformVisualPieceToH1("knight","g1");
            TransformVisualPieceToH1("oponents_knight","g3");
            TransformVisualPieceToH1("pawn","h2");
	
            TransformVisualPieceToH1("DragParticle","e1");
            TransformVisualPieceToH1("MoveParticle","c3");
        }

        function TransformVisualPieceToH1(piecetype,piece_from):void	{
            // Blender complect of pieces is good way to create models and put to Unity3D, just copy to assets folder,
            var Obj = GameObject.Find( ((piecetype.IndexOf("Particle")>=0) ? piecetype :  "chessboard_min2/"+piecetype) );
            var a8Obj = GameObject.Find("black_rook_scaled_a8");
            var h1Obj = GameObject.Find("white_rook_scaled_h1");
            var dx=(h1Obj.transform.position.x-a8Obj.transform.position.x)/7;
            var dy=(h1Obj.transform.position.y-a8Obj.transform.position.y)/7;
            var dz=(h1Obj.transform.position.z-a8Obj.transform.position.z)/7;
	
            var h=System.Convert.ToInt32(piece_from[0])-System.Convert.ToInt32("a"[0]);
            var v=System.Convert.ToInt32(piece_from.Substring(1,1));
	
            Obj.transform.position +=Vector3(dx*(7-h),dy*(Mathf.Sqrt(Mathf.Pow((7-h),2)+Mathf.Pow((v-1),2))),dz*(v-1));
        }

        function HideBlankPieces():void	{
            GameObject.Find("black_rook_scaled_a8").GetComponent.<Renderer>().enabled = false;
            GameObject.Find("white_rook_scaled_h1").GetComponent.<Renderer>().enabled=false;
            GameObject.Find("chessboard_min2/pawn").GetComponent.<Renderer>().enabled=false;
            GameObject.Find("chessboard_min2/knight").GetComponent.<Renderer>().enabled=false;
            GameObject.Find("chessboard_min2/oponents_knight").GetComponent.<Renderer>().enabled=false;
            GameObject.Find("chessboard_min2/bishop").GetComponent.<Renderer>().enabled=false;
            GameObject.Find("chessboard_min2/rook").GetComponent.<Renderer>().enabled=false;
            GameObject.Find("chessboard_min2/queen").GetComponent.<Renderer>().enabled=false;
            GameObject.Find("chessboard_min2/king").GetComponent.<Renderer>().enabled=false;
	
            GameObject.Find("MoveParticle").GetComponent.<Renderer>().enabled=false;
            GameObject.Find("DragParticle").GetComponent.<Renderer>().enabled=false;
        }

        function CreatePiece(piece_color:String,piecetype:String,piece_at:String):void	{
            var toObj : GameObject;
            var fromObj = GameObject.Find("chessboard_min2/"+piecetype);
            var piece_position= PiecePosition(piecetype,piece_at);
	
            toObj=Instantiate(fromObj, piece_position, fromObj.transform.rotation );
            toObj.name="piece_"+piece_at;
            toObj.GetComponent.<Renderer>().material=(GameObject.Find( ((piece_color=="b") ? "black_rook_scaled_a8" : "white_rook_scaled_h1"  ))).GetComponent.<Renderer>().material;
	
            toObj.GetComponent.<Renderer>().enabled=true;
        }

        function PiecePosition(piecetype:String,piece_at:String):Vector3	{
            var a8Obj = GameObject.Find("black_rook_scaled_a8");
            var h1Obj = GameObject.Find("white_rook_scaled_h1");
            var dx=(h1Obj.transform.position.x-a8Obj.transform.position.x)/7;
            var dy=(h1Obj.transform.position.y-a8Obj.transform.position.y)/7;
            var dz=(h1Obj.transform.position.z-a8Obj.transform.position.z)/7;
	
            var drx=-(h1Obj.transform.rotation.x-a8Obj.transform.rotation.x)/7;
            var dry=-(h1Obj.transform.rotation.y-a8Obj.transform.rotation.y)/7;
            var drz=-(h1Obj.transform.rotation.z-a8Obj.transform.rotation.z)/7;
	
            var fromObj = GameObject.Find( ((piecetype.IndexOf("Particle")>=0) ? piecetype :  "chessboard_min2/"+piecetype) );
	
            var h=System.Convert.ToInt32(piece_at[0])-System.Convert.ToInt32("a"[0]);
            var v=System.Convert.ToInt32(piece_at.Substring(1,1));
            if(C0.c0_side<0)			// Could also work with cameras, anyway this also isn't a bad solution... (Swap board if black)
            {
                h=7-h;
                v=9-v;
            }
		
            // Very according to camera placement...
            //  The thing is that 2D board 8x8 calculation can't be measured with 3D vectors in a simple way. So, constants were used for existing models...
            var h1=(7-h)*0.96;
            var v1=(v-1)*1.04;
	
            return (fromObj.transform.position+ Vector3(-dx*h1,-dy*0.6*(Mathf.Sqrt(Mathf.Pow(h1,2)+Mathf.Pow(v1,2))),-dz*v1));
        }

            function position2board():void	{
                var c0_Zposition=C0.c0_position;
                for(var c0_i=0;c0_Zposition.length>c0_i; c0_i+=5)		{
                    var c0_Zcolor=c0_Zposition.Substring(c0_i,1);
                    var c0_Zfigure=c0_Zposition.Substring(c0_i+1,1);
                    var c0_Z_at = c0_Zposition.Substring(c0_i+2,2);
                    CreatePiece(c0_Zcolor,piecelongtype(c0_Zfigure,c0_Zcolor),c0_Z_at);
                }
            }

            function piecelongtype(figure1:String,color1:String):String	{
                var ret="";
                if(figure1=="p") ret="pawn";
                else if(figure1=="N") ret=(((color1=="w") && (C0.c0_side>0)) || ((color1=="b") && (C0.c0_side<0))  ? "knight":"oponents_knight");
                else if(figure1=="B") ret="bishop";
                else if(figure1=="R") ret="rook";
                else if(figure1=="Q") ret="queen";
                else if(figure1=="K") ret="king";
                return ret;
            }

                function DoPieceMovements():void	{

                // added
                if(drag1_animator>0)
		{
		GameObject.Find("piece_"+drag1_at).transform.position.y-=(5.5-drag1_animator)*0.06;
		drag1_animator--;
		}
                //********
                    if(C0.c0_moves2do.length>0)		{
                        if(move_animator>0)			{
                            var move_from=C0.c0_moves2do.Substring(0,2);
                            var move_to=C0.c0_moves2do.Substring(2,2);
                            var bc=(((C0.c0_moves2do.length>4) && (C0.c0_moves2do.Substring(4,1)=="[")) ? C0.c0_moves2do.Substring(5,1) : " ");

                            var mObj:GameObject;
                            mObj=GameObject.Find("piece_"+move_from);
			
                            var pieceat=((("QRBN").IndexOf(bc)>=0) ? "p" : (C0.c0_D_what_at(move_to)).Substring(1,1));
                            var piececolor=(C0.c0_D_what_at(move_to)).Substring(0,1);
                            var piecetype=piecelongtype(pieceat,piececolor);

                            var mfrom=PiecePosition(piecetype,move_from);
                            var mto=PiecePosition(piecetype,move_to);
                            // piece moves constantly towards the square...

                            mObj.transform.position =  mfrom + ((mto - mfrom)/10 * (11-move_animator));
                            // a little jump for knight and castling rook...
                            if((piecetype.IndexOf("knight")>=0)  || ((bc=="0") && (piecetype=="rook")))
                                mObj.transform.position.y+=(move_animator-(5-(move_animator>5?5:move_animator))+3)*0.2;
	
                            move_animator--;
                            if((!drawAnim) || (move_animator==3))	{	// If a piece was captured and moving near...
                                var dObj:GameObject;
                                dObj=GameObject.Find("piece_"+ move_to);
                                if(dObj==null)					{
                                    if((piecetype=="pawn") && (!(move_from.Substring(0,1)==move_to.Substring(0,1))))	// en-passant...
                                    {
                                        dObj=GameObject.Find("piece_"+ move_to.Substring(0,1)+move_from.Substring(1,1));
                                        if(!(dObj==null)) Destroy (dObj);
                                    }
                                }
                                else Destroy (dObj);
                            }

                            if(move_animator==0)				{
                                mObj.name="piece_"+move_to;

                                // If a pawn becomes a better piece...
                                if(("QRBN").IndexOf(bc)>=0)					{
                                    Destroy (mObj);
                                    CreatePiece(piececolor,piecelongtype(bc,piececolor),move_to); 		// promotion...
                                }
                                C0.c0_moves2do=(C0.c0_moves2do).Substring( ((bc==" ")? 4 : 7) );

                                if(C0.c0_moves2do.length==0) C0.c0_moving=false;
                            }
                        }
                else	{
                            move_animator=(drawAnim ? GetTimeDelta(10,4): 1);					// 4 seconds animation anyway...
                    drag1_animator=0;
                }
            }
        }

        // check gameover...
        function checkGameover()	{
            if((!gameover) && (engineStatus==0) && (move_animator<4))	{
                if(C0.c0_D_is_check_to_king("w") || C0.c0_D_is_check_to_king("b"))			{
                    message2show = "Check+";
                    alert=true;
                    if( C0.c0_D_is_mate_to_king("w") ) {alert=false; message2show = "Checkmate!!!\n Black Win!!!"; gameover=true;
                        GameObject.Find("AndroidWins").GetComponent.<GUITexture>().enabled = true;
                        yield WaitForSeconds(5);
                        GameObject.Find("AndroidWins").GetComponent.<GUITexture>().enabled = false;
                    }
                    if( C0.c0_D_is_mate_to_king("b") ) {alert=false; message2show = "Checkmate!!!\n White Win!!!"; gameover=true;
                        GameObject.Find("AppleWins").GetComponent.<GUITexture>().enabled = true;
                        yield WaitForSeconds(5);
                        GameObject.Find("AppleWins").GetComponent.<GUITexture>().enabled = false;
			
                    }
                }
                else			{
                    if(((C0.c0_sidemoves>0) && C0.c0_D_is_pate_to_king("w")) || ((C0.c0_sidemoves<0) && C0.c0_D_is_pate_to_king("b")))
                    { message2show = "Draw!!!"; gameover=true; }
                }
            }
            if(mode==2) {
                if(C0.c0_side>0) message2show =menuArr[lang_flag][22];
                else message2show =menuArr[lang_flag][21];
            }
	
            if(mode==1) {
                if((!gameover) && (C0.c0_moves2do.length==0) && (engineStatus==0))		{
                    if(C0.c0_waitmove) {
                        if(mode==1) message2show=menuArr[lang_flag][13]; 
                    }
                    else if(!(C0.c0_sidemoves==C0.c0_side))			{			
                        message2show=menuArr[lang_flag][14];
                        engineStatus=1;
                    }
                }
            }
	
        }

        // this routine starts chess engine if needed...
        function DoEngineMovements():void	{
            C0.c0_waitmove=(C0.c0_sidemoves==C0.c0_side);
	
            checkGameover();
	
            if(engineStatus==2)		{
                (GameObject.Find("Script6")).SendMessage("SetDeepLevel",chess_strength.ToString());
                (GameObject.Find("Script6")).SendMessage("SetRequestFEN",C0.c0_get_FEN());
                engineStatus=3;
            }
        }

        // this call receives answer from the chess engine... (from other object)
        function EngineAnswer(answer:String):void
        {
            var move="";

            if(answer.length>0)
            {
                if((answer.length>9) && (answer.Substring(0,10)=="Stockfish:"))
                {
                    move=answer.Substring(11,4);
                    C0.c0_become_from_engine = ((answer.length<16)?"Q":(answer.Substring(15,1)).ToUpper());
                    if(move.length>0)
                    {
                        message2show = answer.Substring(0,13)+"-"+answer.Substring(13);
                        C0.c0_move_to(move.Substring(0,2),move.Substring(2,2));
                        C0.c0_sidemoves=-C0.c0_sidemoves;
                        hide=true;
                        alert=false;
                    }
                }
                else
                {
                    C0.c0_become_from_engine = ((answer.length>5)?answer.Substring(6,1):"Q");
                    if(C0.c0_D_can_be_moved(answer.Substring(0,2),answer.Substring(3,2)))
                    {
                        message2show="My move is " + answer;
                        C0.c0_move_to(answer.Substring(0,2),answer.Substring(3,2));
                        C0.c0_sidemoves=-C0.c0_sidemoves;
                        hide=true;
                        alert=false;
                    }
                }
            }
            engineStatus=0;
        }


        // Takeback and new game starting is like RollBack - one/all moves.
        function RollBackAction():void
        {
            if((TakeBackFlag || NewGameFlag) && (!C0.c0_moving) && (C0.c0_moves2do.length==0) )
            //&&((C0.c0_sidemoves==C0.c0_side) || gameover) &&  (drag1_animator==0) && (move_animator==0))
            {
                if(gameover) gameover=false;
		
            for(var h=0;h<8;h++)
                for(var v=8;v>0;v--)
                {
                    var id="piece_"+System.Convert.ToChar(System.Convert.ToInt32("a"[0])+h)+v.ToString();		// Is this square mouse is over?
                    var qObj=GameObject.Find(id);
                    if(!(qObj==null)) Destroy(qObj);
                }	
            if(TakeBackFlag)
            {
                if(mode==1)	{
                    C0.c0_take_back();
                    if(!(C0.c0_sidemoves==C0.c0_side)) C0.c0_take_back();
                    TakeBackFlag=false;
                }
                else if(mode==2) {
                    if(C0.c0_moveslist=="") {
                        TakeBackFlag=false;
                        setCamSide=true;
                    }
                    else {
                        C0.c0_take_back();
                        temp=white;
                        white=black;
                        black=temp;
                        TakeBackFlag=false;
                        if(white == "w") {setCamSide=true; setCamSide2=false;}
                        if(white != "w") {setCamSide=false; setCamSide2=true;}
                    }
                }
            }
            if(NewGameFlag)
            {
                if(mode==1) {
                    C0.c0_set_start_position("");
                    C0.c0_sidemoves=1;
                    C0.c0_waitmove=false;
                    C0.c0_side=-C0.c0_side;
                    C0.c0_waitmove=(C0.c0_side==C0.c0_sidemoves);
                    NewGameFlag=false;
                }
                else if(mode==2) {
                    if(C0.c0_side==1) message2show ="WHITE TURN!";
                    else message2show ="BLACK TURN!";
                    C0.c0_set_start_position("");
                    C0.c0_sidemoves=1;
                    C0.c0_waitmove=true;
                    white="w";
                    black="b";
                    temp="";
                    setCamSide=true; setCamSide2=false;
                    NewGameFlag=false;
                }
            }	
		
            position2board();					// Set current position on the board visually...
        }
    }

    function GetTimeDelta(min_interval:int, secs:int):int		// To slow animation on fastest CPU
        {
            var dt= ((Time.deltaTime*min_interval)/secs).ToString();		// 3-seconds to move...
            var pt=dt.IndexOf("."); if(pt<0) pt=dt.IndexOf(".");
            var dt_int= System.Convert.ToInt32( ((pt<0)? dt : dt.Substring(0,pt)) );
	
            return Mathf.Max(min_interval,dt_int);
        }

        function StockfishAccess(status:String):void
        {
            StockfishAccessible=(status=="YES");
            if(!StockfishAccessible)
            {
                useStockfish=false;
                if(engineStatus>0)
                { 
                    engineStatus=0;			// actually pass to the next chess engine...
                    message2show = "Stockfishcall error"; 
                }
            }
        }



        function OnApplicationQuit():void { }