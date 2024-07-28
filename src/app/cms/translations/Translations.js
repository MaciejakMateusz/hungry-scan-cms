import React from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import Select from "react-select";
import {newCustomSelect} from "../../../styles";
import {CustomNoOptionsMessage} from "../dishes-categories/form-components/CustomNoOptionsMessage";
import {TranslationStatus} from "./TranslationStatus";

export const Translations = () => {
    const {t} = useTranslation();

    return (
        <>
            <Helmet>
                <title>CMS - {t("translations")}</title>
            </Helmet>
            <div className={'translation-background'}>
                <main className={'translations-padded-view-container'}>
                    <div className={'translations-vertical-split-grid'}>
                        <header className={'translations-vertical-split-header-left'}>
                            <Select id={'translation-group'}
                                    name={'translation-group'}
                                    styles={newCustomSelect}
                                    components={{NoOptionsMessage: CustomNoOptionsMessage}}
                            />
                        </header>
                        <section className={'translations-vertical-split-left'}>
                            <div className={'translation-record-grid header'}>
                                <span className={'translations-records-column left header'}>{t('name')}</span>
                                <span className={'translations-records-column middle header'}>{t('description')}</span>
                                <span className={'translations-records-column right header'}>{t('status')}</span>
                            </div>
                            <div className={'translation-record-grid parent'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-display-order'}>1.</span>
                                    <span className={'translation-record-content'}>Przystawki</span>
                                </span>
                                <span className={'translations-records-column middle'}></span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Pizza tuna
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>sos pomidorowy, mozzarella, składniki fajne itp</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Pizza tuna
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>sos pomidorowy, mozzarella, składniki fajne itp</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Pizza tuna
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>sos pomidorowy, mozzarella, składniki fajne itp</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={false}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Pizza tuna
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>sos pomidorowy, mozzarella, składniki fajne itp</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={false}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Pizza tuna
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>sos pomidorowy, mozzarella, składniki fajne itp</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={false}/>
                                </span>
                            </div>

                            <div className={'translation-record-grid parent'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-display-order'}>2.</span>
                                    <span className={'translation-record-content'}>Dania główne</span>
                                </span>
                                <span className={'translations-records-column middle'}></span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={false}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Policzki wołowe
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>Z chrzanem i kluskami śląskimi</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Policzki wołowe
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>Z chrzanem i kluskami śląskimi</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Policzki wołowe
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>Z chrzanem i kluskami śląskimi</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Policzki wołowe
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>Z chrzanem i kluskami śląskimi</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Policzki wołowe
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>Z chrzanem i kluskami śląskimi</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>

                            <div className={'translation-record-grid parent'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-display-order'}>2.</span>
                                    <span className={'translation-record-content'}>Dania główne</span>
                                </span>
                                <span className={'translations-records-column middle'}></span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={false}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Policzki wołowe
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>Z chrzanem i kluskami śląskimi</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Policzki wołowe
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>Z chrzanem i kluskami śląskimi</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Policzki wołowe
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>Z chrzanem i kluskami śląskimi</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Policzki wołowe
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>Z chrzanem i kluskami śląskimi</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>
                            <div className={'translation-record-grid child'}>
                                <span className={'translations-records-column left'}>
                                    <span className={'translation-record-content'}>
                                            Policzki wołowe
                                    </span>
                                </span>
                                <span className={'translations-records-column middle'}>
                                    <span className={'translation-record-content'}>Z chrzanem i kluskami śląskimi</span>
                                </span>
                                <span className={'translations-records-column right'}>
                                        <TranslationStatus translated={true}/>
                                </span>
                            </div>

                        </section>
                        <header className={'translations-vertical-split-header-right'}>
                            <button className={'translations-chosen-lang active'}>
                                {t('english')}
                            </button>
                            <button className={'translations-chosen-lang'}>
                                {t('german')}
                            </button>
                        </header>
                        <section className={'translations-vertical-split-right'}>
                            <form className={'translation-wrapper'}>
                                <div className={'original-translation-box'}>
                                    <div className={'original-translation-header'}>
                                        <span className={'translation-text-label'}>
                                            {t('originalText')}
                                        </span>
                                        <div className={'language-label'}>
                                            {t('originalText')}
                                        </div>
                                    </div>
                                    <div className={'original-text-content-container'}>
                                        <span className={'original-text-content'}>
                                            Pizza tuna
                                        </span>
                                    </div>
                                </div>
                                <div className={'translate-to-box'}>
                                    <div className={'translate-to-header'}>
                                        <span className={'translation-text-label'}>
                                            {t('translation')}
                                        </span>
                                        <div className={'translation-status-label-group'}>
                                            <div className={'translate-to-translation-status'}>
                                                <TranslationStatus translated={true}/>
                                            </div>
                                            <div className={'language-label'}>
                                                {t('english')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'translate-to-content-container'}>
                                        <textarea className={'translation-textarea-input'}
                                                  placeholder={t('typeTranslation')}/>
                                    </div>
                                    <div className={'translate-to-footer'}>
                                        <div className={'auto-translation-group'}>
                                            <span className={'translate-icon'}>#<sub>A</sub></span>
                                            <span
                                                className={'automatic-translation-text'}>{t('automaticTranslation')}</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}