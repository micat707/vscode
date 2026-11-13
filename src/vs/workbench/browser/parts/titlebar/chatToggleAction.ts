/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize2 } from '../../../../nls.js';
import { Action2, MenuId, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { Categories } from '../../../../platform/action/common/actionCommonCategories.js';
import { URI } from '../../../../base/common/uri.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { AuxiliaryBarVisibleContext } from '../../../common/contextkeys.js';
import { ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';

// --- Chat toggle (Kiro-style title bar button) --- //
// Toggles the auxiliary (secondary) sidebar where the Continue chat lives.
// Rendered in the title bar's right-hand global actions area.

// Solid (filled) speech-bubble icon matching Kiro's title bar glyph.
// Shipped as an inline SVG data URI so it does not depend on a packaged media file.
const CHAT_BUBBLE_SVG = (fill: string) =>
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${fill}" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`;

const chatBubbleIcon = {
	dark: URI.parse('data:image/svg+xml,' + encodeURIComponent(CHAT_BUBBLE_SVG('#EDEDED'))),
	light: URI.parse('data:image/svg+xml,' + encodeURIComponent(CHAT_BUBBLE_SVG('#424242'))),
};

registerAction2(class ToggleChatAction extends Action2 {
	constructor() {
		super({
			id: 'workbench.action.toggleChat',
			title: localize2('toggleChat', "Toggle Chat"),
			category: Categories.View,
			icon: chatBubbleIcon,
			toggled: AuxiliaryBarVisibleContext,
			menu: [
				{
					id: MenuId.TitleBar,
					group: 'navigation',
				},
			],
		});
	}

	run(accessor: ServicesAccessor): void {
		accessor.get(ICommandService).executeCommand('workbench.action.toggleAuxiliaryBar');
	}
});
