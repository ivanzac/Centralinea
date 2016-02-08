/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		var push = PushNotification.init({
        "windows": {} 
        });
        

        push.on('notification', function(data) {
            Materialize.toast(data.message, 1000);
            push.finish(function () {
                console.log('finish successfully called');
				console.log("registration event");
                console.log("URI : ", data.registrationId);
                console.log(JSON.stringify(data));
            });
        });

        push.on('error', function(e) {
            console.log("push error");
        });
		
		
		
		
        document.addEventListener("backbutton", onBackKeyDown, false);
		Materialize.toast("Atuadores", 1000);
		$("#bar").addClass('indeterminate');
		url = window.localStorage.getItem("ip");
		chave = window.localStorage.getItem("chave");	
		$("#rl_1").text(window.localStorage.getItem("rl_1"));
		$("#rl_2").text(window.localStorage.getItem("rl_2"));
		$("#profile").text(window.localStorage.getItem("nome"));

		getStateButtons();
		change_names();
		//StatusBar.hide();
    }
};

app.initialize();