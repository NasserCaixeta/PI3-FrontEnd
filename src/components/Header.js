import { signOut } from "firebase/auth";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";

export default function Header({
  containerStyle,
  textStyle,
  hoverTextStyle,
  onPressInicio,
  rightContent,
  rightContainerStyle,
  userEmailStyle,
  logoutTextStyle,
  onLogout,
}) {
  const [hovered, setHovered] = useState(false);
  const user = auth?.currentUser;

  const handleLogout = () => {
    if (onLogout) return onLogout();
    if (auth) {
      signOut(auth).catch(() => {});
    }
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPress={onPressInicio}
      >
        <Text style={[textStyle, hovered && hoverTextStyle]}>Início</Text>
      </TouchableOpacity>
      {rightContent !== undefined ? (
        rightContent
      ) : (
        <View style={rightContainerStyle}>
          <Text style={userEmailStyle}>{user?.email}</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={logoutTextStyle}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
