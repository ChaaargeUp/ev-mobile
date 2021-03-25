import { Text, View } from 'native-base';
import React from 'react';
import { Chip } from 'react-native-paper';

import BaseProps from '../../types/BaseProps';
import User, { UserStatus } from '../../types/User';
import Utils from '../../utils/Utils';
import computeStyleSheet from './UserComponentStyle';
import UserAvatar from './avatar/UserAvatar';

export interface Props extends BaseProps {
  user: User;
  selected?: boolean;
}

interface State {
}

export default class UserComponent extends React.Component<Props, State> {
  public props: Props;
  public state: State;

  constructor(props: Props) {
    super(props);
  }

  public setState = (state: State | ((prevState: Readonly<State>, props: Readonly<Props>) => State | Pick<State, never>) | Pick<State, never>, callback?: () => void) => {
    super.setState(state, callback);
  }

  private computeStatusStyle(status: string, style: any) {
    switch (status) {
      case UserStatus.ACTIVE:
        return style.active;
      case UserStatus.PENDING:
        return style.pending;
      case UserStatus.BLOCKED:
      case UserStatus.INACTIVE:
      case UserStatus.LOCKED:
        return style.inactive;
    }
  }

  public render() {
    const style = computeStyleSheet();
    const { user, selected, navigation } = this.props;
    const userFullName = Utils.buildUserName(user);
    const userRole =  user ?  user.role : '';
    const userStatus = user ? user.status : '';
    const statusStyle = this.computeStatusStyle(userStatus, style);
    return (
      <View style={style.userContent}>
        <View style={style.left}>
          <UserAvatar user={user} selected={selected} navigation={navigation}/>
        </View>
        <View style={selected ?  [style.columnContainer, style.selected] : style.columnContainer }>
          <View style={style.rowContainer}>
            <View style={style.name}>
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={style.text}>{userFullName}</Text>
            </View>
            <View style={style.statusContainer}>
              <Chip style={[style.status, statusStyle]} textStyle={[style.statusText, statusStyle]}>{Utils.translateUserStatus(userStatus)}</Chip>
            </View>
          </View>
          <View style={style.email}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={style.text}>{user.email}</Text>
          </View>
          <View style={style.roleContainer}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[style.text, style.role]}>{Utils.translateUserRole(userRole)}</Text>
          </View>
        </View>
      </View>);
  }
}