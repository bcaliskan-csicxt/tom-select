/**
 * Plugin: "action_hooks" (CSI Technologies)
 * Copyright (c) contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

import TomSelect from '../../tom-select';
import { getDom } from '../../vanilla';
import { CBOptions } from './types';

export default function(this:TomSelect, userOptions:CBOptions) {
	const self = this;

	const options = Object.assign({}, userOptions);

	self.on('initialize', () => {
		if (options.clear) {
			var clearButton = getDom(options.clear);
			clearButton?.addEventListener('click', (evt) => {
				if (self.isDisabled) return;
	
				self.clear();
	
				if (self.settings.mode === 'single' && self.settings.allowEmptyOption) {
					self.addItem('');
				}
	
				evt.preventDefault();
				evt.stopPropagation();
			});

			self.hook('after', 'onItemAdd', function () {
				if (self.items.length) clearButton.classList.remove('hidden');
				else clearButton.classList.add('hidden');
			});

			self.hook('after', 'onItemRemove', function () {
				if (self.items.length) clearButton.classList.remove('hidden');
				else clearButton.classList.add('hidden');
			});
		}
		
		if (options.selectAll) {
			var selectAllButton = getDom(options.selectAll);
			selectAllButton?.addEventListener('click', (evt) => {
				if (self.isDisabled) return;
				
				self.addItems(Object.keys(self.options));

				evt.preventDefault();
				evt.stopPropagation();
			});
		}
	});

};
