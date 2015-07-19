/************************************************************************
 * Copyright 2015 Kareem Mesbah. All rights reserved.                   *
 * The program is distributed under the terms of the GNU General        *
 * Public License.                                                      *
 *                                                                      *
 * This file is part of QuickMan.                                       *
 *                                                                      *
 * QuickMan is free software: you can redistribute it and/or modify     *
 * it under the terms of the GNU General Public License as published by *
 * the Free Software Foundation, either version 3 of the License, or    *
 * (at your option) any later version.                                  *
 *                                                                      *
 * QuickMan is distributed in the hope that it will be useful,          *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of       *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the        *
 * GNU General Public License for more details.                         *
 *                                                                      *
 * You should have received a copy of the GNU General Public License    *
 * along with QuickMan.  If not, see <http://www.gnu.org/licenses/>.    *
 ************************************************************************/

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		if (request.needle){
	  		request.needle = request.needle.trim();
			findMatches(request.needle, sendResponse);
		}
		else if(request.href){
			$.ajax("http://man7.org/linux/man-pages" + request.href, {
				"async": false,
				"success": function(manPage){
					sendResponse({"manPage": manPage});
				}
			});
		}
	}
);

/* finds matches to needle and sends response back */
function findMatches(needle, sendResponse){
	// escape special characters in needle
	needle = needle.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

	var regex = new RegExp(needle, "gi");
	var response = {"allMatches": []};
	var curr = 0;
	data.forEach(function(manJSONs){
		for (i in manJSONs){
			if (regex.test(manJSONs[i].content)){
				if (manJSONs[i].content == needle){
					response["exactMatchIndex"] = curr;
				}
				response.allMatches[curr++] = manJSONs[i];
			}
		}
	});

	sendResponse(response);
}
