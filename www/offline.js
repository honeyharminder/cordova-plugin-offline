/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck');
var channel = require('cordova/channel');
var exec = require('cordova/exec');
var cordova = require('cordova');

channel.createSticky('onCordovaInfoReady');
// Tell cordova channel to wait on the CordovaInfoReady event
channel.waitForInitialization('onCordovaInfoReady');

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function Offline () {

    var me = this;
    var available;
    
    channel.onCordovaReady.subscribe(function () {
        me.getInfo(function (info) {
            // ignoring info.cordova returning from native, we should use value from cordova.version defined in cordova.js
            // TODO: CB-5105 native implementations should not return info.cordova
            console.log(info);
            channel.onCordovaInfoReady.fire();
        }, function (e) {
            me.available = false;
            console.error('[ERROR] Error initializing cordova-plugin-device: ' + e);
        });
    });
}

/**
 * Get device info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
Offline.prototype.getInfo = function (successCallback, errorCallback) {
   // argscheck.checkArgs('fF', 'Device.getInfo', arguments);
    exec(successCallback, errorCallback, 'Offline', 'getLoadInfo', []);
};

module.exports = new Offline();
