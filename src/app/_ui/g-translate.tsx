"use client";
import Script from "next/script";

export default function GTranslate() {
	return (
		<>
			<div className="py-4">
				<div
					className="w-full"
					id="google_translate_element"
				/>
			</div>
			<Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
			<Script
				id="google-translate-script"
				strategy="beforeInteractive"
				async
				dangerouslySetInnerHTML={{
					__html: `function googleTranslateElementInit() {
						new google.translate.TranslateElement({pageLanguage: 'en', includedLanguage: 'uz,en,ru', floatPosition: 0}, 'google_translate_element');
					}`,
				}}
			/>
		</>
	);
}

