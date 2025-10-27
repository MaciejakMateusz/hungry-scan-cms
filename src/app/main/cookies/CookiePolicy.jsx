import React from "react";
import { useTranslation } from "react-i18next";
import {Footer} from "./CookiePolicy.style";

export const CookiePolicy = () => {
    const { t } = useTranslation();

    return (
        <div>
            <header role="banner">
                <div className="container">
                    <h1 id="top">{t('cookie_policy_for_brand')}</h1>
                    <time dateTime="2025-10-26">{t('last_updated')}</time>
                </div>
            </header>

            <main id="content" className="container" role="main">
                <nav className="toc" aria-label={t('on_this_page')}>
                    <strong>{t('on_this_page')}</strong>
                    <ul>
                        <li><a href="#overview">{t('toc_overview')}</a></li>
                        <li><a href="#interpretation-and-definitions">{t('toc_interpretation_definitions')}</a></li>
                        <li><a href="#use-of-cookies">{t('toc_use_of_cookies')}</a></li>
                        <li><a href="#types-of-cookies">{t('toc_types_of_cookies')}</a></li>
                        <li><a href="#your-choices">{t('toc_your_choices')}</a></li>
                        <li><a href="#more-info">{t('toc_more_info')}</a></li>
                        <li><a href="#contact">{t('toc_contact')}</a></li>
                    </ul>
                </nav>

                <section id="overview" aria-labelledby="overview-heading">
                    <h2 id="overview-heading">{t('overview_heading')}</h2>
                    <p>{t('overview_p1')}</p>
                    <p>{t('overview_p2')}</p>
                    <p className="note">{t('overview_note')}</p>
                </section>

                <section id="interpretation-and-definitions" aria-labelledby="defs-heading">
                    <h2 id="defs-heading">{t('defs_heading')}</h2>

                    <h3>{t('interpretation_heading')}</h3>
                    <p>{t('interpretation_p')}</p>

                    <h3>{t('definitions_heading')}</h3>
                    <dl>
                        <dt>{t('term_company_dt')}</dt>
                        <dd>{t('term_company_dd')}</dd>

                        <dt>{t('term_cookies_dt')}</dt>
                        <dd>{t('term_cookies_dd')}</dd>

                        <dt>{t('term_website_dt')}</dt>
                        <dd>
                            {t('term_website_dd_prefix')} <strong>HungryScan</strong>, {t('term_website_dd_suffix')}{" "}
                            <a href="https://www.hungryscan.pl" rel="noopener">www.hungryscan.pl</a>.
                        </dd>

                        <dt>{t('term_you_dt')}</dt>
                        <dd>{t('term_you_dd')}</dd>
                    </dl>
                </section>

                <section id="use-of-cookies" aria-labelledby="use-heading">
                    <h2 id="use-heading">{t('use_heading')}</h2>
                    <p>{t('use_p1')}</p>
                    <p>{t('use_p2')}</p>
                </section>

                <section id="types-of-cookies" aria-labelledby="types-heading">
                    <h2 id="types-heading">{t('types_heading')}</h2>

                    <table role="table" aria-describedby="types-heading">
                        <thead>
                        <tr>
                            <th scope="col">{t('table_category_th')}</th>
                            <th scope="col">{t('table_type_th')}</th>
                            <th scope="col">{t('table_admin_th')}</th>
                            <th scope="col">{t('table_purpose_th')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><strong>{t('necessary_title')}</strong></td>
                            <td>{t('necessary_type')}</td>
                            <td>{t('necessary_admin')}</td>
                            <td>{t('necessary_purpose')}</td>
                        </tr>
                        <tr>
                            <td><strong>{t('functionality_title')}</strong></td>
                            <td>{t('functionality_type')}</td>
                            <td>{t('functionality_admin')}</td>
                            <td>{t('functionality_purpose')}</td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                <section id="your-choices" aria-labelledby="choices-heading">
                    <h2 id="choices-heading">{t('choices_heading')}</h2>
                    <p>{t('choices_intro')}</p>
                    <ul>
                        <li>{t('choices_step_disable')}</li>
                        <li>{t('choices_step_delete')}</li>
                    </ul>
                    <p>{t('choices_option_sentence')}</p>
                    <p>{t('choices_inconvenience')}</p>
                    <p>{t('browser_help_intro')}</p>
                    <ul>
                        <li>
                            {t('browser_chrome_label')}{" "}
                            <a href="https://support.google.com/accounts/answer/32050" rel="noopener">
                                https://support.google.com/accounts/answer/32050
                            </a>
                        </li>
                        <li>
                            {t('browser_ie_label')}{" "}
                            <a href="http://support.microsoft.com/kb/278835" rel="noopener">
                                http://support.microsoft.com/kb/278835
                            </a>
                        </li>
                        <li>
                            {t('browser_firefox_label')}{" "}
                            <a
                                href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored"
                                rel="noopener"
                            >
                                https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored
                            </a>
                        </li>
                        <li>
                            {t('browser_safari_label')}{" "}
                            <a
                                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                                rel="noopener"
                            >
                                https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac
                            </a>
                        </li>
                        <li>{t('browser_other_label')}</li>
                    </ul>
                </section>

                <section id="more-info" aria-labelledby="more-info-heading">
                    <h2 id="more-info-heading">{t('more_info_heading')}</h2>
                    <p>{t('more_info_p')}</p>
                </section>

                <section id="contact" aria-labelledby="contact-heading">
                    <h2 id="contact-heading">{t('contact_heading')}</h2>
                    <p>{t('contact_intro')}</p>
                    <ul>
                        <li>
                            {t('contact_email_label')}{" "}
                            <a href="mailto:maciejak.praca@gmail.com">maciejak.praca@gmail.com</a>
                        </li>
                    </ul>
                </section>
            </main>

            <Footer role="contentinfo">
                <div className="container">
                    &copy; <span id="year">{new Date().getFullYear()}</span> HungryScan. {t('all_rights_reserved')}
                </div>
            </Footer>
        </div>
    );
};
