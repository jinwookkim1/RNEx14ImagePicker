import React, {Component} from 'react';
import {View, Text, Image, Button} from 'react-native';

//#### react-native-image-picker 라이브러리 추가하기 ##################

// 1) install
//   $ npm install react-native-image-picker --save

// 2) link [ 0.6 이상부터는 자동 link - 안해도 됨. ]
//   $ react-native link react-native-image-picker

//################################################################

// import할때 {}표시 없음을 주의
import ImagePicker from 'react-native-image-picker';


export default class Main extends Component{

    constructor(){
        super(); 
        
        this.state={
            img: {uri:"https://cdn.pixabay.com/photo/2019/12/14/12/08/night-4694750_960_720.jpg"},
        }
    }

    render(){
        return (
            <View style={ { flex:1, padding:16, }}>
                <Button title="show Picker" onPress={ this.showPicker }></Button>
                <Text style={ { margin:8, } }> {this.state.img.uri} </Text>
                <Image source={ this.state.img } style={ {marginTop:8, flex:1} }></Image>
            </View>
        );
    }

    showPicker=()=>{        

        // Android의 경우 퍼미션이 필요하기에 직접 AndroidManifest.xml에 2개의 퍼미션 추가해야함.[ 안하면 response.error임 ] - 동적퍼미션 다이얼로그는 자동으로 보여짐
        // <uses-permission android:name="android.permission.CAMERA"/>
        // <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>

        // Android 10 이상을 타겟팅하는 경우 앱의 manifest 파일에서 requestLegacyExternalStorage의 값을 true로 설정합니다.
        // <manifest ... >
        //     <!-- This attribute is "false" by default on apps targeting
        //         Android 10 or higher. -->
        //     <application android:requestLegacyExternalStorage="true" ... >
        //         ...
        //     </application>
        // </manifest>
        

        // ios도 퍼미션 필요함. 검색을 통해서 try it.


        // Picker Dialog의 옵션객체
        // 1) 처음에는 options객체 없이 기본 picker다이얼로그 사용[ 버전 업되면서 options가 없으면 에러남 ]
        //const options= {};

        // 2) picker dialog의 옵션값들 [ 파일 가장 밑에 옵션값들 참고]
        const options = {
            title: 'Select Picker', //다이얼로그 제목 
            cancelButtonTitle : '취소', //다이얼로그 취소 버튼
            takePhotoButtonTitle : '카메라', //카메라 앱 선택버튼 타이틀
            chooseFromLibraryButtonTitle : '이미지선택', //파일을 선택할 수 있는 library 앱 타이틀

            //카메라 선택[Take Photo...]할 때 저장옵션
            storageOptions: {
              skipBackup: true, //ios에서 icloud에 백업할 것인가? -android는 무시됨.
              path: 'images',// 저장될 폴더명[ Pictures/[path]/ on Android. ]
            },
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        };

        

        // 위에서 만든 옵션객체 전달 및 다이얼로그의 선택에 따른 콜백함수 파라미터로 전달 
        ImagePicker.showImagePicker(options, (response) => {
          
            if (response.didCancel) { 
                alert('User cancelled image picker');
            } else if (response.error) {
                alert('ImagePicker Error: ', response.error);

                //custom버튼은 굳이 안해도 됨.
            } else if (response.customButton) {
                alert('User tapped custom button: ', response.customButton);

            } else {
                //이 곳에 왔다면 카메라 or library에서 이미지가 잘 선택된 것임.

                //선택된 이미지의 uri 경로를 response객체로 부터 얻어오기
                const source = { uri: response.uri };             
          
                //선택된 이미지의 uri를 state변수 설정하여 화면 갱신
                this.setState({
                    img: source,
                });

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            }
        });
        
        
        //추가. 혹시 picker 선택 없이 카메라 or 라이브러리앱을 바로 실행하고 싶다면.
        //1) Launch Camera:
        // ImagePicker.launchCamera(options, (response) => {
        //     // Same code as in above section!
        // });
        
        //2) Open Image Library:
        // ImagePicker.launchImageLibrary(options, (response) => {
        //     // Same code as in above section!
        // }); 

    }

    // 혹시 동적 퍼미션이 필요하다면 ////////////////////////////////////////////////
    //동적퍼미션 ##############################################
    // async  requestLocationPermission(){
    //     try {
    //     const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //             // {
    //             // 'title': 'Example App',
    //             // 'message': 'Example App access to your location '
    //             // }
    //     )
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         console.log("You can use the location")
    //         alert("You can use the location");
    //     } else {
    //         console.log("location permission denied")
    //         alert("Location permission denied");
    //     }
    //     } catch (err) {
    //     console.warn(err)
    //     }
    // }

    // async componentDidMount() {        
    //     await this.requestLocationPermission();
    // }
    // ###########################################################     
}



// Options #######################################################################################
// option	                        iOS	Android	Info
// title	                        OK	OK	    Specify null or empty string to remove the title
// cancelButtonTitle	            OK	OK	    Specify null or empty string to remove this button
// takePhotoButtonTitle	            OK	OK	    Specify null or empty string to remove this button
// chooseFromLibraryButtonTitle	    OK	OK	    Specify null or empty string to remove this button
// customButtons	                OK	OK	    An array containing objects with the name and title of buttons
// cameraType	                    OK	-	    'front' or 'back'
// mediaType	                    OK	OK	    'photo', 'video', or 'mixed' on iOS, 'photo' or 'video' on Android
// maxWidth	                        OK	OK	    Photos only
// maxHeight	                    OK	OK	    Photos only
// quality                  	    OK	OK	    0 to 1, photos only
// videoQuality	                    OK	OK	    'low', 'medium', or 'high' on iOS, 'low' or 'high' on Android
// durationLimit            	    OK	OK	    Max video recording time, in seconds
// rotation	                        -	OK	    Photos only, 0 to 360 degrees of rotation
// allowsEditing            	    OK	-	    bool - enables built-in iOS functionality to resize the image after selection
// noData	                        OK	OK	    If true, disables the base64 data field from being generated (greatly improves performance on large photos)
// storageOptions	                OK	OK	    If this key is provided, the image will be saved in your app's Documents directory on iOS, or your app's Pictures directory on Android (rather than a temporary directory)
// storageOptions.skipBackup	    OK	-	    If true, the photo will NOT be backed up to iCloud
// storageOptions.path	            OK	OK	    If set, will save the image at Documents/[path]/ rather than the root Documents for iOS, and Pictures/[path]/ on Android.
// storageOptions.cameraRoll	    OK	OK	    If true, the cropped photo will be saved to the iOS Camera Roll or Android DCIM folder.
// storageOptions.waitUntilSaved	OK	-	    If true, will delay the response callback until after the photo/video was saved to the Camera Roll. If the photo or video was just taken, then the file name and timestamp fields are only provided in the response object when this AND cameraRoll are both true.
// permissionDenied.title	        -	OK	    Title of explaining permissions dialog. By default Permission denied.
// permissionDenied.text	        -	OK	    Message of explaining permissions dialog. By default To be able to take pictures with your camera and choose images from your library..
// permissionDenied.reTryTitle  	-	OK	    Title of re-try button. By default re-try
// permissionDenied.okTitle     	-	OK	    Title of ok button. By default I'm sure
// ##############################################################################################



// The Response Object ########################################################

// key	            iOS	Android	Description
// didCancel	    OK	OK	    Informs you if the user cancelled the process
// error	        OK	OK	    Contains an error message, if there is one
// customButton	    OK	OK	    If the user tapped one of your custom buttons, contains the name of it
// data	            OK	OK  	The base64 encoded image data (photos only)
// uri          	OK	OK  	The uri to the local file asset on the device (photo or video)
// origURL      	OK	-	    The URL of the original asset in photo library, if it exists
// isVertical	    OK	OK  	Will be true if the image is vertically oriented
// width	        OK	OK  	Image dimensions (photos only)
// height       	OK	OK  	Image dimensions (photos only)
// fileSize     	OK	OK  	The file size (photos only)
// type	            OK	OK  	The file type (photos only)
// fileName	        OK (photos and videos)	OK (photos)	The file name, if available
// path	            -	OK	    The file path
// latitude	        OK	OK	    Latitude metadata, if available
// longitude	    OK	OK	    Longitude metadata, if available
// timestamp    	OK	OK	    Timestamp metadata, if available, in ISO8601 UTC format
// originalRotation	-	OK  	Rotation degrees (photos only) See #109
// ##############################################################################