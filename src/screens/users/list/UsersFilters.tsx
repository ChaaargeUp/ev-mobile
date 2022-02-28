import { View } from 'native-base';
import React from 'react';

import ScreenFilters, { ScreenFiltersProps } from '../../../components/search/filter/screen/ScreenFilters';
import FilterModalContainerComponent
  from '../../../components/search/filter/containers/FilterModalContainerComponent';
import SwitchFilterComponent
  from '../../../components/search/filter/controls/switch/SwitchFilterComponent';
import { GlobalFilters } from '../../../types/Filter';
import I18n from 'i18n-js';
import computeStyleSheet from './UsersFiltersStyles';
import SecuredStorage from '../../../utils/SecuredStorage';

export interface UsersFiltersDef {
  issuer?: boolean;
}

export default class UsersFilters extends ScreenFilters<UsersFiltersDef> {

  public async componentDidMount(): Promise<void> {
    await super.componentDidMount();
    await this.loadInitialFilters();
  }

  private async loadInitialFilters() {
    const issuer = await SecuredStorage.loadFilterValue(this.centralServerProvider.getUserInfo(), GlobalFilters.ROAMING);
    const initialFilters = { issuer: !!issuer };
    this.onFiltersChanged(null, initialFilters, true);
  }

  public render = () => {
    const { filters } = this.state;
    const style = computeStyleSheet();
    return (
      <View>
        <FilterModalContainerComponent
          onFilterChanged={(newFilters) => this.onFiltersChanged(null, newFilters, true)}
          ref={(filterModalContainerComponent: FilterModalContainerComponent) =>
            this.setFilterModalContainerComponent(filterModalContainerComponent)
          }>
          {this.securityProvider?.isComponentOrganizationActive() && (
            <SwitchFilterComponent<boolean>
              filterID={'issuer'}
              internalFilterID={GlobalFilters.ROAMING}
              enabledValue={true}
              style={style.switchFilterControlComponentContainer}
              label={I18n.t('filters.usersRoamingFilterLabel')}
              initialValue={filters?.issuer}
              ref={async (
                roamingFilterControlComponent : SwitchFilterComponent<boolean>
              ) => this.addModalFilter(roamingFilterControlComponent)}
            />
          )}
        </FilterModalContainerComponent>
      </View>
    );
  };
}
